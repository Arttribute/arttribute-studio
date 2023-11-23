import { Pencil1Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

import { squircle } from "ldrs";
squircle.register();

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import axios from "axios";

const profileFormSchema = z.object({
  modelname: z
    .string()
    .min(2, {
      message: "modelname must be at least 2 characters.",
    })
    .max(30, {
      message: "modelname must not be longer than 30 characters.",
    }),
  collection: z.string({
    required_error: "Select a collection of artwork to train your model on",
  }),
  description: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

//

interface EditTunedModelProps {
  details: {
    _id: string;
    model_name: string;
    description: string;
    display_image: string;
    license: string;
    status: string;
    prompt_count: number;
    slug: string;
  };
}

export function EditTunedModel({ details }: EditTunedModelProps) {
  const defaultValues: Partial<ProfileFormValues> = {
    modelname: details.model_name,
    description: details.description,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const modelDetails = {
      model_name: details.model_name,
      description: details.description,
      display_image: details.display_image,
    };
    try {
      const result = await axios.put(
        `api/tunedmodels/${details._id}`,
        modelDetails,
        {
          params: { id: details._id },
        }
      );
      const fineTuneResponse = result.data;
      console.log(fineTuneResponse);

      //redirect to tuned model page
      window.location.href = `/tunedmodels`;
    } catch (error) {
      console.error("Error training model:", error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center">
          <Pencil1Icon className="mr-1 h-3 w-3" />
          Edit Details
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Model Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="modelname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tuned Model Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My tuned model" {...field} />
                    </FormControl>
                    <FormDescription>
                      {"This is your tuned model's display name."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your tuned model."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Save model Details</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

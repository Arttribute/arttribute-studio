"use client";
import axios from "axios";
import { v4 as uuid } from "uuid";
import slugify from "slugify";
import { useState, useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { playlists } from "../../../data/playlists";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/models/User";

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

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  description: "A tuned model trained on my art collection.",
};

export default function CreateModel() {
  const [collections, setCollections] = useState<Array<any>>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
    if (!loaded) {
      getCollections(user._id);
    }
  }, [loaded]);

  async function getCollections(userId: string) {
    const res = await axios.get("/api/collections/users", {
      params: { userId: userId },
    });
    const data = res.data;
    console.log(data);
    setCollections(data);
    setLoaded(true);
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    //map collection name to collection object
    const collection: any = collections.find(
      (collection) => collection._id === data.collection
    );
    const model_uuid = uuid();
    const modelDetails = {
      model: {
        title: `${data.modelname}-Arttribute`,
        name: "style",
        branch: "sd15",
        model_type: null,
        image_urls: collection.images,
      },
      metadata: {
        owner: account?._id, //TODO: account should never be null
        model_name: data.modelname,
        description: data.description,
        display_image: collection.images[0],
        license: collection.license,
        colection_id: collection._id,
        example_prompt: "",
        slug: slugify(`${data.modelname}-${model_uuid}`).toLowerCase(),
        model_uuid: model_uuid,
      },
    };
    try {
      const result = await axios.post("/api/tunedmodels", modelDetails);
      const fineTuneResponse = result.data;
      console.log(fineTuneResponse);
      setLoading(false);
      //redirect to tuned model page
      window.location.href = `/tunedmodels`;
    } catch (error) {
      console.error("Error training model:", error);
    }
  }

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="flex items-center ">
                    <Link href="/tunedmodels" passHref className="ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-black cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="{3}"
                          d="M10 19l-7-7m0 0l7-7m-7 "
                        />
                      </svg>
                    </Link>
                    <h2 className="text-2xl font-semibold tracking-tight ml-1">
                      New Tuned Model
                    </h2>
                  </div>

                  <div className="rounded-md border border-dashed p-10 m-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="modelname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tuned Model Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="My tuned model"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                This is your tuned model's display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="collection"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Art Collection</FormLabel>
                              <Select
                                onValueChange={(value) => field.onChange(value)}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a collection of artwork to train your tuned model on" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {collections.length > 0 && loaded ? (
                                    collections.map((collection) => (
                                      <SelectItem
                                        key={collection._id}
                                        value={collection._id}
                                        className="flex items-center space-x-2"
                                      >
                                        {collection.collection_name}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <p>Create a new Collection</p>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Manage your art collections in the{" "}
                                <Link
                                  href="/collections"
                                  className=" underline"
                                >
                                  collections tab
                                </Link>
                                .
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
                        {loading ? (
                          <Button disabled>
                            Creating Tuned Model
                            <div className="ml-2 mt-1">
                              <l-squircle
                                size="22"
                                stroke="2"
                                stroke-length="0.15"
                                bg-opacity="0.1"
                                speed="0.9"
                                color="white"
                              ></l-squircle>
                            </div>
                          </Button>
                        ) : (
                          <Button type="submit">Create Tuned Model</Button>
                        )}
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const modelIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-4 w-4"
  >
    <rect width="20" height="20" x="2" y="2" rx="3" />
    <rect width="7" height="5" x="8.5" y="2" rx="1" />
    <circle cx="8" cy="13" r="1" />
    <circle cx="16" cy="13" r="1" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

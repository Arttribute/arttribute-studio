"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { DialogFooter } from "./ui/dialog";
import Image from "next/image";
import { defaultProfile } from "@/data/defaults";
import { toast } from "./ui/use-toast";
import { Web3Storage } from "web3.storage";
import { useState } from "react";
import { User } from "@/models/User";
import { Textarea } from "./ui/textarea";
//import { ConfirmDeleteDialog } from "./account-dialog";

interface Props {
  web3Address: string;
  name: string;
  email?: string;
  description?: string;
  tags?: string[];
  picture: string;
  setAccount: React.Dispatch<React.SetStateAction<User | null>>;
}

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 30 characters.",
  }),
  tags: z.array(z.string().min(1, "Tag must have at least 1 character")),
});

const InputForm = ({
  web3Address,
  name,
  email,
  description,
  tags,
  picture,
  setAccount,
}: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const storageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
  const storage = new Web3Storage({ token: storageToken });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      email,
      bio: description,
      tags,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setDisabled(true);

    try {
      let fileUrl =
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";
      if (file) {
        const storedFile = await storage.put([file]);
        fileUrl = `https://${storedFile.toString()}.ipfs.w3s.link/${file.name}`;
      }

      const res = await fetch(`/api/users/${web3Address}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, fileUrl: fileUrl ?? picture }),
      });

      if (!res.ok) {
        console.error("Failed to update user");
      } else {
        //   toast({
        //     title: "Success",
        //     description: "Successfully updated user",
        //   });

        const resData = await res.json();

        localStorage.setItem("user", JSON.stringify(resData));
        setDisabled(false);
        setAccount(resData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Pick your best interests"
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.value.includes(",")) {
                      const tags = e.target.value
                        .split(",")
                        .map((tag) => tag.toLowerCase().trim());
                      // const tags = e.target.value.split(",").map((tag) => tag.replace(/\s/g, ''))
                      field.onChange(tags);
                    } else {
                      field.onChange([e.target.value.trim()]);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The tags should be comma-separated.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center space-x-3">
          <div className="rounded-md overflow-hidden">
            <Image
              src={picture || defaultProfile}
              alt="profile"
              width={100}
              height={100}
              className="h-auto w-auto object-cover aspect-square"
            />
          </div>

          <FormItem>
            <FormLabel>Picture</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between">
            {/*<ConfirmDeleteDialog
              web3Address={web3Address}
              setAccount={setAccount}
                />*/}
            <Button type="submit" disabled={disabled}>
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default InputForm;

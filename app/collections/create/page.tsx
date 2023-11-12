"use client";
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { playlists } from "../../../data/playlists";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Web3Storage } from "web3.storage";
import axios from "axios";

const profileFormSchema = z.object({
  collection_name: z
    .string()
    .min(2, {
      message: "collection_name must be at least 2 characters.",
    })
    .max(30, {
      message: "collection_name must not be longer than 30 characters.",
    }),
  license: z.string({
    required_error: "Please select a license for your collection.",
  }),
  description: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  description: "A collection of my favorite art pieces.",
};

export default function CreateCollectiion() {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const storageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
  const storage = new Web3Storage({ token: storageToken });
  async function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    try {
      let storedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const imagefile = files[i];
        const storedFile = await storage.put([imagefile]);
        const fileUrl = `https://${storedFile.toString()}.ipfs.w3s.link/${
          imagefile.name
        }`;
        storedFiles.push(fileUrl);
        console.log("uploaded:", i, " ", fileUrl);
      }
      console.log(storedFiles);

      const collection_data = {
        owner: "6550dac1e8faf5719ccff30c",
        collection_name: data.collection_name,
        description: data.description,
        license: data.license,
        images: storedFiles,
        slug: "my-new-art-collection",
      };
      console.log(collection_data);
      const res = await axios.post("/api/collections", collection_data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-10 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="flex items-center ">
                    <Link href="/collections" passHref className="ml-3">
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
                      New Art Collection
                    </h2>
                  </div>

                  <div className="rounded-md border border-dashed p-10 pt-6 m-4 ">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="collection_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Collection Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="My Art Collection"
                                  {...field}
                                />
                              </FormControl>

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
                                  placeholder="Describe your collection."
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
                          name="license"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Collection Licence</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a Licence for your Collection" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="BY">BY</SelectItem>
                                  <SelectItem value="BYSA">BY SA</SelectItem>
                                  <SelectItem value="BYNCSA">
                                    BY NC SA
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                What are{" "}
                                <Link
                                  href="/collections"
                                  className=" underline"
                                >
                                  Arttribute licenses
                                </Link>
                                ?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormItem>
                          <FormLabel>
                            Upload Image files {"(Up to 25 files)"}
                          </FormLabel>
                          <div className="flex flex-col items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-lg">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleFileChange}
                              className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0 file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-gray-00 hover:file:bg-violet-100"
                            />
                          </div>
                        </FormItem>
                        <Button type="submit"> Create Collection</Button>
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

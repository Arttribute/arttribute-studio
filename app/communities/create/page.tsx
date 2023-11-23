"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import {
  Select as ShardSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Select from "react-select";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Web3Storage } from "web3.storage";
import { v4 as uuid } from "uuid";
import slugify from "slugify";
import axios from "axios";
import { InfoCard } from "@/components/info-card";
import { TunedModel } from "@/models/TunedModel";
import { User } from "@/models/User";

const profileFormSchema = z.object({
  community_name: z
    .string()
    .min(2, {
      message: "community_name must be at least 2 characters.",
    })
    .max(30, {
      message: "community_name must not be longer than 30 characters.",
    }),
  visibility: z.string({
    required_error: "Please select a visibility for your community.",
  }),
  description: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  description: "A community with my favorite models.",
};

interface Model {
  value: string;
  label: string;
}

// async function getData() {
//   const model_data2 = await fetch("${process.env.NEXT_PUBLIC_BASE_URL}/api/tunedmodels");

//   if (!model_data2.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return model_data2.json();
// }

export default function CreateCollectiion() {
  const [profileImage, setProfileImage] = useState<File>();
  const [banner, setBanner] = useState<File>();
  const [selectedModels, setModels] = useState([]);
  const [model_data, setModelData] = useState<TunedModelOut[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loadedAccount, setLoadedAccount] = useState(true);
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tunedmodels`)
      .then((res) => res.json())
      .then((data) => {
        setModelData(data);
      });
  }, []);

  const handleModelChange = async (selected: any, selectaction: any) => {
    const { action } = selectaction;
    // console.log(`action ${action}`);
    if (action === "clear") {
    } else if (action === "select-option") {
    } else if (action === "remove-value") {
    }
    setModels(selected.map((model: Model) => model.value));
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const storageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
  const storage = new Web3Storage({ token: storageToken });

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    if (selectedModels.length < 2 || selectedModels.length > 10) {
      return;
    }
    try {
      // Uploading Profile Photo
      const storedFile = await storage.put([profileImage]);
      const profilePhotoUrl = `https://${storedFile.toString()}.ipfs.w3s.link/${
        profileImage?.name
      }`;
      console.log("uploaded:", profileImage?.name, " ", profilePhotoUrl);

      //Uploading Banner Image
      const storedBanner = await storage.put([banner]);
      const bannerUrl = `https://${storedBanner.toString()}.ipfs.w3s.link/${
        banner?.name
      }`;
      console.log("uploaded:", profileImage?.name, " ", bannerUrl);

      const community_uuid = uuid();
      const community_data = {
        name: data.community_name,
        description: data.description,
        admins: [account?._id], //TODO: Replace with User's ID
        members: [account?._id], //TODO: Replace with User's ID
        models: selectedModels,
        visibility: data.visibility,
        display_image: profilePhotoUrl,
        banner_image: bannerUrl,
        slug: slugify(`${data.community_name}-${community_uuid}`).toLowerCase(),
        community_uuid: community_uuid,
        approved: false,
      };
      console.log(community_data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/communities`,
        community_data
      );
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  }

  interface TunedModelOut extends TunedModel {
    _id: string;
  }
  //   const model_data: TunedModelIn[] =  getData();

  const models = model_data.map((mdl) => ({
    value: mdl._id,
    label: mdl.model_name,
  }));
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
                    <Link href="/communities" passHref className="ml-3">
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
                      Create new community
                    </h2>
                  </div>
                  {submitted ? (
                    <div className="mt-5 w-full">
                      <p>
                        Thank you for submitting a community request! Your
                        request will be reviewed soon so keep an eye out on our
                        communities page
                      </p>

                      <Button
                        size="sm"
                        className="w-full mt-5"
                        onClick={() => {
                          setSubmitted(false);
                        }}
                      >
                        Back to Form
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-col px-5">
                        <InfoCard
                          data={{
                            title:
                              "Please note that this is only a request to create a community",
                            content:
                              "Our team will swiftly review it, ensuring everything aligns perfectly. Once approved, your community will come to life!",
                          }}
                        />
                      </div>
                      <div className="rounded-md border border-dashed p-10 pt-6 m-4 ">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                          >
                            <FormField
                              control={form.control}
                              name="community_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Community Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="New Art community"
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
                                      placeholder="Describe your community."
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
                              name="visibility"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <p className="flex gap-2">
                                      <span>Community Visibility</span>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <svg
                                              width="15"
                                              height="15"
                                              viewBox="0 0 15 15"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                                                fill="currentColor"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                              ></path>
                                            </svg>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p className="text-slate-500">
                                              <p className="text-base">
                                                What does visibility mean?
                                              </p>
                                              <ol className="text-sm">
                                                <li className="">
                                                  <span className="font-bold">
                                                    Public:
                                                  </span>
                                                  Anyone can join the community
                                                  and create
                                                </li>
                                                <li className="">
                                                  <span className="font-bold">
                                                    Private:{" "}
                                                  </span>{" "}
                                                  Restricted access to create;
                                                  users must request to join,
                                                  but the creations are still
                                                  visible to everyone
                                                </li>
                                              </ol>
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </p>
                                  </FormLabel>
                                  <ShardSelect
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Visibility" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="private">
                                        Private
                                      </SelectItem>
                                      <SelectItem value="public">
                                        Public
                                      </SelectItem>
                                    </SelectContent>
                                  </ShardSelect>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormItem>
                              <FormLabel>Select Models (2-10)</FormLabel>
                              <Select
                                id="model-select"
                                instanceId="selectWarna"
                                isMulti
                                name="models"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={models}
                                onChange={handleModelChange}
                                placeholder="Add Models"
                              />
                            </FormItem>

                            <FormItem>
                              <FormLabel>
                                Upload Community profile image
                              </FormLabel>
                              <div className="flex flex-col items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-lg">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (!e.target.files) return;
                                    setProfileImage(e.target.files[0]);
                                  }}
                                  className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0 file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-gray-00 hover:file:bg-violet-100"
                                />
                              </div>
                            </FormItem>

                            <FormItem>
                              <FormLabel>
                                Upload Community banner image (1000 x 200 px
                                recommended)
                              </FormLabel>
                              <div className="flex flex-col items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-lg">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (!e.target.files) return;
                                    setBanner(e.target.files[0]);
                                  }}
                                  className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0 file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-gray-00 hover:file:bg-violet-100"
                                />
                              </div>
                            </FormItem>

                            <Button
                              className="flex"
                              disabled={loading}
                              type="submit"
                            >
                              {loading ? (
                                <div className="flex">
                                  <span>Submitting request...</span>
                                  <div className="ml-2">
                                    <l-squircle
                                      size="22"
                                      stroke="2"
                                      stroke-length="0.15"
                                      bg-opacity="0.1"
                                      speed="0.9"
                                      color="white"
                                    ></l-squircle>
                                  </div>
                                </div>
                              ) : (
                                "Create community"
                              )}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

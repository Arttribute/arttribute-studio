"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";

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
import { Switch } from "@/components/ui/switch";

import { toast } from "@/components/ui/use-toast";
import { v4 as uuid } from "uuid";
import { User } from "@/models/User";
import slugify from "slugify";
import axios from "axios";
import { RequireAuthPlaceholder } from "@/components/require-auth-placeholder";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Loader, Lock, Scale, Trophy, Vote } from "lucide-react";

import { create } from "@web3-storage/w3up-client";
import { DatePicker } from "@/components/datepicker";
import { ThumbnailUpload } from "@/components/thumbnail-upload";
import { set } from "mongoose";

const CreateChallenge = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<User | null>(null);
  const [loadedAccount, setLoadedAccount] = useState(true);
  const [challengeName, setChallengeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [aannounceDate, setAnnounceDate] = useState<Date>();
  const [privateChallenge, setPrivateChallenge] = useState<Boolean>(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [decider, setDecider] = useState<string>("public");
  const [judgingCriteria, setJudgingCriteria] = useState<string>("");
  const [prizeDescription, setPrizeDescription] = useState<string>("");

  const { push } = useRouter();
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
    setLoadedAccount(true);
  }, []);
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
  const defaultValues: Partial<ProfileFormValues> = {};
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function handleSubmit() {
    setLoading(true);
    console.log(account);
    try {
      const challenge_uuid = uuid();
      const challenge_code = challenge_uuid.slice(0, 8);
      const challenge_slug = slugify(
        (challengeName + "-" + challenge_code).toLowerCase()
      );
      const challenge_data = {
        challenge_name: challengeName,
        challenge_uuid: challenge_uuid,
        slug: challenge_slug,
        code: challenge_code,
        description: description,
        thumbnail: thumbnailUrl,
        owner: account?._id,
        start_date: startDate,
        end_date: endDate,
        announcement_date: aannounceDate,
        private: privateChallenge,
        is_publicvoting: decider === "public",
        is_judged: decider === "judged",
        judging_criteria: judgingCriteria,
        prize_description: prizeDescription,
      };
      console.log(challenge_data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenges`,
        challenge_data
      );
      console.log(res);
      setLoading(false);
      //redirect to collection page
      push("/challenges/" + challenge_slug);
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
        <div className="mt-14">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 ">
                {account != null ? (
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
                        New Challenge
                      </h2>
                    </div>

                    <div className="rounded-md border border-dashed p-10 pt-6 m-4 ">
                      <Form {...form}>
                        <div className="space-y-3">
                          <div className="flex mt-4">
                            <ThumbnailUpload
                              setImageUrl={setThumbnailUrl}
                              imageUrl={thumbnailUrl}
                            />
                            <div className="m-2 mt-auto">
                              <p className="text-sm font-medium">Thumbnail</p>
                              <p className="text-xs text-muted-foreground ">
                                A thumbnail for your challenge
                              </p>
                              <p className="text-xs text-muted-foreground ">
                                This will be the image that represents your
                                challenge
                              </p>
                              <p className="text-xs text-muted-foreground ">
                                The thumbnail must be a jpg png or gif file
                              </p>
                            </div>
                          </div>
                          <FormField
                            control={form.control}
                            name="collection_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Challenge Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Challenge name"
                                    {...field}
                                    autoFocus
                                    onChange={(e) =>
                                      setChallengeName(e.target.value)
                                    }
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
                                  <Input
                                    placeholder="Exciting new challenge for artists!"
                                    {...field}
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center space-x-2 mt-4">
                            <Switch
                              id="private"
                              onChange={() =>
                                setPrivateChallenge(!privateChallenge)
                              }
                            />
                            <div className="flex items-center space-x-1">
                              <Lock />
                              <div className="flex flex-col">
                                <p className="text-sm font-medium">Private</p>
                                <p className="text-xs text-muted-foreground">
                                  Only invited participants can join
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="flex flex-col mr-4">
                              <FormLabel className="mb-1">Start date</FormLabel>
                              <DatePicker
                                setDate={setStartDate}
                                date={startDate}
                              />
                            </div>
                            <div className="flex flex-col mr-2 ">
                              <FormLabel className="mb-1">End date</FormLabel>
                              <DatePicker setDate={setEndDate} date={endDate} />
                            </div>
                          </div>

                          <div>
                            <FormLabel>Who chooses the winner</FormLabel>
                            <div className="mt-1">
                              <RadioGroup defaultValue="public">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="public"
                                    id="public"
                                    checked={decider === "public"}
                                    onChange={() => setDecider("public")}
                                  />
                                  <Vote />
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium">
                                      Public Voting
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Anyone can vote for the winner
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="judged"
                                    id="judged"
                                    checked={decider === "judged"}
                                    onChange={() => setDecider("judged")}
                                  />
                                  <Scale />
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium">
                                      Judging
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      A panel of judges will choose the winner{" "}
                                      {"(include judging criteria)"}
                                    </p>
                                  </div>
                                </div>
                              </RadioGroup>
                              <div className="mt-2">
                                <Input placeholder="Judfing criteria" />
                              </div>
                            </div>
                            <div className="mt-4">
                              <FormLabel className="flex mb-2">
                                Prize
                                <Trophy className="h-3.5 w-3.5" />
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Describe in detail the prize for the winner"
                                  onChange={(e) =>
                                    setPrizeDescription(e.target.value)
                                  }
                                />
                              </FormControl>

                              <FormDescription>
                                The prize can be anything from a cash prize to
                                exposure for the winner
                              </FormDescription>
                              <div className="flex flex-col mr-2 ">
                                <div className="flex ">
                                  <FormLabel className="mt-1 mb-1">
                                    Winner announce date
                                  </FormLabel>
                                </div>

                                <DatePicker
                                  setDate={setAnnounceDate}
                                  date={aannounceDate}
                                />
                              </div>
                            </div>
                          </div>

                          {loading ? (
                            <Button disabled>
                              Creating Challenge
                              <div className="ml-2 mt-1">
                                <Loader className="h-4 w-4 animate-spin" />
                              </div>
                            </Button>
                          ) : (
                            <Button onClick={handleSubmit}>
                              Create Challenge
                            </Button>
                          )}
                        </div>
                      </Form>
                    </div>
                  </div>
                ) : null}
                {loadedAccount && !account ? (
                  <div className="m-12">
                    <RequireAuthPlaceholder />{" "}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChallenge;

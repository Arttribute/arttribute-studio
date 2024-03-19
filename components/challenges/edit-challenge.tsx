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

const EditChallenge = ({ challenge }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<User | null>(null);
  const [loadedAccount, setLoadedAccount] = useState(true);
  const [challengeName, setChallengeName] = useState<string>(
    challenge?.challenge_name
  );
  const [description, setDescription] = useState<string>(
    challenge?.description
  );
  const [startDate, setStartDate] = useState<Date>(challenge?.start_date);
  const [endDate, setEndDate] = useState<Date>(challenge?.end_date);
  const [aannounceDate, setAnnounceDate] = useState<Date>(
    challenge?.announcement_date
  );
  const [privateChallenge, setPrivateChallenge] = useState<Boolean>(
    challenge?.is_private
  );
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    challenge?.thumbnail
  );
  const [decider, setDecider] = useState<string>("public");
  const [judgingCriteria, setJudgingCriteria] = useState<string>(
    challenge?.judging_criteria
  );
  const [prizeDescription, setPrizeDescription] = useState<string>(
    challenge?.prize_description
  );

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
      const challenge_data = {
        _id: challenge._id,
        challenge_name: challengeName,
        description: description,
        thumbnail: thumbnailUrl,
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
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenges/${challenge._id}`,
        challenge_data
      );
      console.log(res);
      setLoading(false);
      //redirect to collection page
      push("/challenges/" + challenge.slug);
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
                  This will be the image that represents your challenge
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
                      onChange={(e) => setChallengeName(e.target.value)}
                      value={challengeName}
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
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2 mt-4">
              <Switch
                id="private"
                onChange={() => setPrivateChallenge(!privateChallenge)}
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
                <DatePicker setDate={setStartDate} date={startDate} />
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
                      <p className="text-sm font-medium">Public Voting</p>
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
                      <p className="text-sm font-medium">Judging</p>
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
                    onChange={(e) => setPrizeDescription(e.target.value)}
                    value={prizeDescription}
                  />
                </FormControl>

                <FormDescription>
                  The prize can be anything from a cash prize to exposure for
                  the winner
                </FormDescription>
                <div className="flex flex-col mr-2 ">
                  <div className="flex ">
                    <FormLabel className="mt-1 mb-1">
                      Winner announce date
                    </FormLabel>
                  </div>

                  <DatePicker setDate={setAnnounceDate} date={aannounceDate} />
                </div>
              </div>
            </div>

            {loading ? (
              <Button disabled>
                Saving Details
                <div className="ml-2 mt-1">
                  <Loader className="h-4 w-4 animate-spin" />
                </div>
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Save Details</Button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditChallenge;

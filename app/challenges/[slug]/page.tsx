"use client";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Info } from "lucide-react";

import axios from "axios";
import { LeaderBoard } from "@/components/challenges/leaderboard";
import SubmissionCard from "@/components/challenges/submission-card";
import TextCopy from "@/components/text-copy";
import { InfoPopover } from "@/components/info-popover";

import { SettingsIcon } from "lucide-react";
import { AnnounceWinner } from "@/components/challenges/announce-winner";
import EditChallenge from "@/components/challenges/edit-challenge";

import CountdownTimer from "@/components/countdown-timer";
export default function ChallengePage({
  params,
}: {
  params: { slug: string };
}) {
  const [challenge, setChallenge] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [loadedAccount, setLoadedAccount] = useState(false);
  const [currentAccountisOwner, setCurrentAccountisOwner] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    if (challenge == null) {
      getChallenge();
    }
    if (user && challenge) {
      setCurrentAccountisOwner(user._id === challenge.owner._id);
    }
  }, [challenge]);

  async function getChallenge() {
    try {
      const { slug } = params;
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenges/${slug}`,
        {
          params: { slug: slug },
        }
      );
      const challenge = result.data.challenge;
      const submissions = result.data.submissions;
      setChallenge(challenge);
      setSubmissions(submissions);
      console.log("challenge", challenge);
    } catch (error) {
      console.error(error);
    }
  }

  async function voteForSubmission(submissionId: string) {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/submissions/votes`,
        {
          submission_id: submissionId,
          voter: account._id,
        }
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="grid lg:grid-cols-5 mt-14">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-4 lg:col-span-4 ">
            <div className="bg-background ">
              <div className="h-full px-4 py-6 lg:px-8">
                <div className="flex mb-4">
                  <Image
                    src={challenge?.thumbnail}
                    alt={challenge?.challenge_name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover transition-all aspect-[1]"
                  />
                  <div className="ml-4 ">
                    <h2 className="text-xl font-semibold">
                      {challenge?.challenge_name}{" "}
                    </h2>
                    <p className="text-sm text-muted-foreground ">
                      by {challenge?.owner?.name}
                    </p>
                    {challenge && (
                      <div className="flex rounded-lg  items-center mt-2">
                        <CountdownTimer endDate={challenge?.end_date} />
                      </div>
                    )}
                  </div>
                  <div className="ml-auto">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex">
                        <p className="text-xs text-muted-foreground">
                          Challenge code{" "}
                        </p>
                        <InfoPopover infoText="Use this code to submit your creations to this challenge" />
                      </div>
                      <TextCopy text={challenge?.code} />
                    </div>
                  </div>
                </div>
                <Tabs defaultValue="submissions" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="submissions" className="relative">
                        Submissions
                      </TabsTrigger>
                      <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                      <TabsTrigger value="about">Description</TabsTrigger>
                      <TabsTrigger value="perks">Perks</TabsTrigger>
                      {currentAccountisOwner && (
                        <TabsTrigger value="manage">
                          <SettingsIcon className="h-4 w-4 mr-1" />
                          Manage
                        </TabsTrigger>
                      )}
                    </TabsList>
                    <div className="ml-auto ">
                      {!currentAccountisOwner && (
                        <Dialog>
                          <DialogTrigger>
                            <Button size="sm" className="relative">
                              Submit your creation
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Submit your creation</DialogTitle>
                              <DialogDescription>
                                Submit your creation to the challenge
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col space-y-4">
                              <Input
                                type="text"
                                placeholder="Enter your creation link"
                                className="w-full"
                              />
                              <Button size="sm" className="w-full">
                                Submit
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                  <TabsContent
                    value="submissions"
                    className="border-none p-0 outline-none"
                  >
                    <ScrollArea className="h-[700px] p-1">
                      <div className="grid grid-cols-5 gap-4">
                        {submissions &&
                          submissions?.map((submission: any) => (
                            <SubmissionCard
                              key={submission._id}
                              submission={submission}
                              voteForSubmission={voteForSubmission}
                            />
                          ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent
                    value="leaderboard"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <LeaderBoard submissions={submissions} />
                  </TabsContent>
                  <TabsContent
                    value="about"
                    className="border-none p-0 outline-none"
                  >
                    <div className="">
                      <p className="text-base font-semibold mb-2">
                        Challenge Description
                      </p>
                      <p className="text-sm">{challenge?.description}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-base font-semibold mb-2">Prize</p>
                      <p className="text-sm">{challenge?.prize_description}</p>
                    </div>
                    {challenge?.rules && (
                      <div className="mt-4">
                        <p className="text-base font-semibold mb-2">Rules</p>
                        <p className="text-sm">{challenge?.rules}</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent
                    value="perks"
                    className="border-none p-0 outline-none"
                  ></TabsContent>
                  {currentAccountisOwner && (
                    <TabsContent
                      value="manage"
                      className="border-none p-0 outline-none"
                    >
                      <AnnounceWinner
                        challenge={challenge}
                        submissions={submissions}
                      />
                      <EditChallenge challenge={challenge} />
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

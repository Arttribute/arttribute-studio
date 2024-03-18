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
import PromptDisplayCard from "@/components/prompt-display-card";
import TextCopy from "@/components/text-copy";
import { InfoPopover } from "@/components/info-popover";

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

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    if (challenge == null) {
      getChallenge();
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
      console.log(submissions);
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
                    src={"/main.webp"}
                    alt={"challengename"}
                    width={120}
                    height={120}
                    className="rounded-lg aspect-[1]"
                  />
                  <div className="ml-4 ">
                    <h2 className="text-xl font-semibold">
                      {challenge?.challenge_name}{" "}
                    </h2>
                    <p className="text-sm text-muted-foreground ">
                      by {challenge?.owner?.name}
                    </p>
                    <div className="flex rounded-lg  items-center">
                      <CalendarIcon className="h-3 w-3 text-muted-foreground m-0.5" />
                      <p className="text-xs text-muted-foreground ">
                        {challenge?.start_date}-{challenge?.end_date}
                      </p>
                    </div>
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
                      <TabsTrigger value="prizes">Prizes</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto ">
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
                            <PromptDisplayCard
                              key={submission._id}
                              prompt={submission.prompt_id}
                            />
                          ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent
                    value="leaderboard"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <LeaderBoard />
                  </TabsContent>
                  <TabsContent
                    value="about"
                    className="border-none p-0 outline-none"
                  ></TabsContent>
                  <TabsContent
                    value="prizes"
                    className="border-none p-0 outline-none"
                  ></TabsContent>
                  <TabsContent
                    value="rules"
                    className="border-none p-0 outline-none"
                  ></TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

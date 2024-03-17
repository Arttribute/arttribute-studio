import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { CalendarIcon } from "lucide-react";

import { LeaderBoard } from "@/components/challenges/leaderboard";
import PromptGalleryGrid from "@/components/prompt-gallery-grid";

export default async function ChallengePage() {
  async function getPrompts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts`, {
      next: { revalidate: 10 },
    });
    const data = await res.json();
    return data;
  }
  const prompts: any = await getPrompts();

  //functionthat searches for challenges based on regex input and array of challenges and returns the matching challenges
  function searchChallenges(search: string, challenges: any) {
    if (search === "") {
      return challenges;
    }
    const regex = new RegExp(search, "i");
    return challenges.filter((challenge: any) => {
      return challenge.name.match(regex);
    });
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
                    <h2 className="text-xl font-semibold">Challenge page </h2>
                    <p className="text-sm text-muted-foreground ">
                      by Astounding art
                    </p>
                    <div className="flex rounded-lg  items-center">
                      <CalendarIcon className="h-3 w-3 text-muted-foreground m-0.5" />
                      <p className="text-xs text-muted-foreground ">
                        22/03/24 - 22/03/24
                      </p>
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
                      <Link href="/challenges/create" passHref>
                        <Button size="sm" className="relative">
                          Submit your creation
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <TabsContent
                    value="submissions"
                    className="border-none p-0 outline-none"
                  >
                    <PromptGalleryGrid prompts={prompts} />
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

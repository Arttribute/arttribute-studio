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

function SearchBar() {
  return (
    <div className="flex w-full max-w-md items-center space-x-2">
      <Input type="text" placeholder="Find a challenge" />
      <Button type="submit">Search</Button>
    </div>
  );
}

async function getChallenges() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenges`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function Challengespage() {
  const challenges: any = await getChallenges();

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
                <Tabs defaultValue="all" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="all" className="relative">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="special">Special</TabsTrigger>
                      <TabsTrigger value="my-challenges">
                        My challenges
                      </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto ">
                      <Link href="/challenges/create" passHref>
                        <Button size="sm" className="relative">
                          Start a challenge
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <TabsContent
                    value="all"
                    className="border-none p-0 outline-none"
                  >
                    <SearchBar />
                    <br />
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {challenges.map((challenge: any) => (
                        <ChallengeCard
                          key={challenge._id}
                          challenge={challenge}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="daily"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <SearchBar />
                  </TabsContent>
                  <TabsContent
                    value="weekly"
                    className="border-none p-0 outline-none"
                  >
                    <SearchBar />
                  </TabsContent>
                  <TabsContent
                    value="monthly"
                    className="border-none p-0 outline-none"
                  >
                    <SearchBar />
                  </TabsContent>
                  <TabsContent
                    value="special"
                    className="border-none p-0 outline-none"
                  >
                    <SearchBar />
                  </TabsContent>
                  <TabsContent
                    value="my-challenges"
                    className="border-none p-0 outline-none"
                  >
                    <SearchBar />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

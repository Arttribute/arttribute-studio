"use client";
import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CollectionArtwork } from "../../../components/collection-artwork";
import { Menu } from "../../../components/menu";
import { Sidebar } from "../../../components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "../../../data/albums";
import { playlists } from "../../../data/playlists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dbConnect from "@/lib/dbConnect";
import { useRouter } from "next/navigation";
import community, { Community } from "@/models/Community";
import { useEffect, useState } from "react";
import { TunedModelCard } from "@/components/tuned-model-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// async function getData(id: String) {
//   const community = await fetch("api/communities/" + id);

//   if (!community.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return community.json();
// }
export default function CommunityPage({ params }: { params: { id: string } }) {
  const [community, setCommunity] = useState<Community>();
  useEffect(() => {
    fetch("http://localhost:3000/api/communities/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        setCommunity(data);
      });
  }, []);
  // const community: Community = await getData(params.id);
  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />

              <div className="col-span-3 lg:col-span-4 lg:border-l min-h-[100vh]">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="w-full rounded-xl bg-red-50 h-[200px] ">
                    <img
                      src={String(community?.banner_image)}
                      className="w-full h-full cover rounded-xl"
                      alt=""
                    />
                  </div>
                  <div className="flex mt-5">
                    <Avatar className="h-14 w-14 mb-2 mr-2">
                      <AvatarImage
                        src={String(community?.display_image)}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start w-full">
                      <h2 className="text-3xl font-semibold tracking-tight">
                        {community?.name}
                      </h2>
                      <div className="">
                        <p className="flex gap-x-1 text-sm duration-200 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="8" cy="8" r="3.8" />
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="17" cy="9" r="3.4" />
                          </svg>
                          {community?.members.length}{" "}
                          {community?.members.length == 1
                            ? " member"
                            : " members"}
                        </p>
                      </div>
                      <div className="bg-green-100 bg-rounded-xl w-full flex items-start rounded-xl py-3 px-5 mt-5 justify-start">
                        <ScrollArea>
                          <div className="flex space-x-5">
                            {community?.members.map((user, i) => (
                              <TooltipProvider key={i}>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <div className="flex items-center justify-center rounded-full bg-red-50 w-10 h-10 border border-green-600 border-2">
                                      <img
                                        className="rounded-full w-9 h-9 contain"
                                        src={user.picture}
                                        alt={user.name}
                                      />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div>
                                      <div className="flex items-end">
                                        <div className="flex mr-3 items-center justify-center rounded-full bg-red-50 w-10 h-10 border border-green-600 border-2">
                                          <img
                                            className="rounded-full w-9 h-9 contain"
                                            src={user.picture}
                                            alt={user.name}
                                          />
                                        </div>
                                        <div className="flex flex-col">
                                          <h3 className="font-semibold text-base">
                                            {user.name}
                                          </h3>
                                          <p className="text-sm">
                                            <span className="font-semibold">
                                              Promts:{" "}
                                            </span>
                                            --
                                          </p>
                                        </div>
                                      </div>

                                      <hr className="my-3" />
                                      <div className="pb-4 px-1">
                                        <a href="#" className="underline">
                                          See creations
                                        </a>
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div>
                    <p>{community?.description}</p>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-2xl font-bold">Models</h2>
                    <div className="grid mt-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                      {community?.models.map((tunedmodel) => (
                        <TunedModelCard
                          key={tunedmodel._id}
                          data={tunedmodel}
                        />
                      ))}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mt-5">Creations</h2>
                    </div>
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

import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

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

async function getData() {
  const communities = await fetch("api/communities");

  if (!communities.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return communities.json();
}
export default function CommunityPage() {
  const communities = getData();
  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-10 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />

              <div className="col-span-3 lg:col-span-4 lg:border-l min-h-[100vh]">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="flex">
                    <Avatar className="h-14 w-14 mb-2 mr-2">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="block">
                      <h2 className="text-3xl font-semibold tracking-tight">
                        Model Name
                      </h2>
                      <div className="flex mb-4">
                        <p className="text-sm text-muted-foreground">
                          By Model Author
                        </p>

                        <p className="text-sm text-muted-foreground ml-3">
                          BY NC
                        </p>
                      </div>
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

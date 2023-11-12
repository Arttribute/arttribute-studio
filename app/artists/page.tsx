import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CollectionArtwork } from "../../components/collection-artwork";
import { Menu } from "../../components/menu";
import { Sidebar } from "../../components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "../../data/albums";
import { playlists } from "../../data/playlists";

export default function MusicPage() {
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
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Artists
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

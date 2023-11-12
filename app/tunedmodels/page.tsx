import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CollectionArtwork } from "../../components/collection-artwork";
import { Menu } from "../../components/menu";
import { TunedModelsEmptyPlaceholder } from "../../components/tunedmodels-empty-placeholder";
import { Sidebar } from "../../components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "../../data/albums";
import { playlists } from "../../data/playlists";
import { TunedModelCard } from "@/components/tuned-model-card";
export default function TunedModels() {
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
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        My Tuned Models
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Fine-tuned models based on your art collections
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                    <TunedModelCard />
                    <TunedModelCard />
                    <TunedModelCard />
                    <TunedModelCard />
                    <TunedModelCard />
                  </div>
                  <TunedModelsEmptyPlaceholder />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CollectionArtwork } from "../components/collection-artwork";
import { Menu } from "@/components/menu";
import { Sidebar } from "../components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "../data/albums";
import { playlists } from "../data/playlists";

import { CollectionCard } from "@/components/collections-card";
import CollectionGalleryGrid from "@/components/collection-gallery-grid";
import { mockImages } from "@/data/mockimages";
import PromptGalleryGrid from "@/components/prompt-gallery-grid";
import { CreateNewDialog } from "@/components/create-new-dialog";
import { TunedModelCard } from "@/components/tuned-model-card";
import PromptDisplayCard from "@/components/prompt-display-card";

import dbConnect from "@/lib/dbConnect";
import Prompt from "@/models/Prompt";
import TunedModel from "@/models/TunedModel";
import Collection from "@/models/Collection";
import User from "@/models/User";

async function getPrompts() {
  await dbConnect();
  const prompts = await Prompt.find()
    .sort({ createdAt: -1 })
    .populate("tunedmodel_id")
    .populate("owner");
  return prompts;
}

async function getTunedModels() {
  await dbConnect();
  const tunedmodels = await TunedModel.find().sort({ createdAt: -1 });
  return tunedmodels;
}

async function getCollections() {
  await dbConnect();
  const collections = await Collection.find().sort({ createdAt: -1 });
  return collections;
}

export default async function CreationsPage() {
  const prompts: any = await getPrompts();
  const tunedmodels = await getTunedModels();
  const collections = await getCollections();

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="lg:grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="art" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="art" className="relative">
                          Art
                        </TabsTrigger>
                        <TabsTrigger value="models">Models</TabsTrigger>
                        <TabsTrigger value="collections">
                          Collections
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto ">
                        <CreateNewDialog />
                      </div>
                    </div>
                    <TabsContent
                      value="art"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Featured Creations
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {prompts.map((prompt: any) => (
                              <PromptDisplayCard
                                key={prompt._id}
                                prompt={prompt}
                                className="w-[250px]"
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Recent Creations
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Explore creations from the community.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex">
                        <div className="container mx-auto p-4">
                          <PromptGalleryGrid prompts={prompts} />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="models"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Featured Models
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4 ">
                            {listenNowAlbums.map((album) => (
                              <CollectionArtwork
                                key={album.name}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Recent Models
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Explore creations by the community.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                            {tunedmodels.map((tunedmodel: any) => (
                              <TunedModelCard
                                key={tunedmodel._id}
                                data={tunedmodel}
                              />
                            ))}
                          </div>

                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="collections"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Featured Collections
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4 ">
                            {collections.map((collection: any) => (
                              <CollectionCard
                                key={collection._id}
                                data={collection}
                                className="w-[260px]"
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Recent Collections
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Explore creations by the community.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {collections.map((collection: any) => (
                          <CollectionCard
                            key={collection._id}
                            data={collection}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

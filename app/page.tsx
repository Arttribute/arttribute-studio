"use client";
import { useEffect, useState } from "react";
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
import CreateNewDialog from "@/components/create-new-dialog";

export default function CreationsPage() {
  const [prompts, setPrompts] = useState<Array<any>>([]);
  const [tunedmodels, setTunedModels] = useState<Array<any>>([]);
  const [collections, setCollections] = useState<Array<any>>([]);
  const [loadedprompts, setLoadedPrompts] = useState(false);
  const [loadedtunedmodels, setLoadedModels] = useState(false);
  const [loadedcollections, setLoadedCollections] = useState(false);
  const [loadingPrompts, setLoadingPrompts] = useState(false);
  const [loadingTunedModels, setLoadingTunedModels] = useState(false);
  const [loadingCollections, setLoadingCollections] = useState(false);

  useEffect(() => {
    if (!loadedprompts) {
      getPrompts();
    }
    if (!loadedtunedmodels) {
      getTunedModels();
    }
    if (!loadedcollections) {
      getCollections();
    }
  }, [prompts, tunedmodels, collections]);

  async function getPrompts() {
    setLoadingPrompts(true);
    const res = await fetch("/api/prompts");
    const data = await res.json();
    console.log(data);
    setPrompts(data);
    setLoadedPrompts(true);
    setLoadingPrompts(false);
  }

  async function getTunedModels() {
    setLoadingTunedModels(true);
    const res = await fetch("/api/tunedmodels");
    const data = await res.json();
    console.log(data);
    setTunedModels(data);
    setLoadedModels(true);
    setLoadingTunedModels(false);
  }

  async function getCollections() {
    setLoadingCollections(true);
    const res = await fetch("/api/collections");
    const data = await res.json();
    console.log(data);
    setCollections(data);
    setLoadedCollections(true);
    setLoadingCollections(false);
  }
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
                          Recent Creations
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Explore creations from the community.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
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
                          <div className="flex space-x-4 pb-4">
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
                          <div className="flex space-x-4 pb-4">
                            {madeForYouAlbums.map((album) => (
                              <CollectionArtwork
                                key={album.name}
                                album={album}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
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
                          <Separator className="my-4" />
                          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
                            {collections.map((collection) => (
                              <CollectionCard
                                key={collection._id}
                                data={collection}
                              />
                            ))}
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
                          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {collections.map((collection) => (
                              <CollectionCard
                                key={collection._id}
                                data={collection}
                              />
                            ))}
                          </div>
                        </div>
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

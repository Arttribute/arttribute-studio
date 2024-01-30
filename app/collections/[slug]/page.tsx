"use client";
import { Metadata } from "next";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { playlists } from "@/data/playlists";
import CollectionGalleryGrid from "@/components/collection-gallery-grid";
import { mockImages } from "@/data/mockimages";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const [collection, setCollction] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [loadedAccount, setLoadedAccount] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    if (collection == null) {
      getCollection();
    }
  }, [collection]);

  async function handleFileChange(e: any) {
    const files = e.target.files;
    console.log(files);
  }

  async function getCollection() {
    try {
      const { slug } = params;
      const result = await axios.get(`/api/collections/${slug}`, {
        params: { slug: slug },
      });
      const collection = result.data;
      setCollction(collection);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {collection?.collection_name}
                    </h2>
                    <div className="flex mb-4">
                      <p className="text-sm text-muted-foreground">
                        By {collection?.owner?.name}
                      </p>
                      <p className="text-sm text-muted-foreground ml-3">
                        license: {collection?.license}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground ">
                      {collection?.description}
                    </p>

                    {
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4">Edit Collection</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[800px]">
                          <DialogHeader>
                            <DialogTitle>Edit Collection</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col">
                            <label className="text-sm text-muted-foreground">
                              Collection name
                            </label>
                            <input
                              className="border border-gray-300 rounded-md p-2 mt-2"
                              defaultValue={collection?.collection_name}
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label className="text-sm text-muted-foreground">
                              Description
                            </label>
                            <textarea
                              className="border border-gray-300 rounded-md p-2 mt-2"
                              defaultValue={collection?.description}
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-lg">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleFileChange}
                              className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0 file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-gray-00 hover:file:bg-violet-100"
                            />
                          </div>
                          <DialogFooter>
                            <Button className="mt-4">Save</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    }

                    <Separator className="my-4" />
                    <div className="flex items-center justify-between p-5">
                      <CollectionGalleryGrid
                        images={collection?.images}
                        collectionName={"My collection"}
                      />
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

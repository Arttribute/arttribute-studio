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

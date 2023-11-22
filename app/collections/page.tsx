"use client";
import { useState, useEffect } from "react";
import { Metadata } from "next";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Menu } from "../../components/menu";
import { CollectionsEmptyPlaceholder } from "../../components/collections-empty-placeholder";
import { Sidebar } from "../../components/sidebar";
import { playlists } from "../../data/playlists";
import { CollectionCard } from "@/components/collections-card";

import Link from "next/link";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Array<any>>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getCollections();
  }, [collections]);

  async function getCollections() {
    const res = await fetch("/api/collections");
    const data = await res.json();
    console.log(data);
    setCollections(data);
    setLoaded(true);
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
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        My Art Collections
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your art collections
                      </p>
                    </div>
                    <div className="ml-auto ">
                      <Link href="/collections/create" passHref>
                        <Button size="sm" className="relative">
                          Create a Collection
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {collections.map((collection) => (
                      <CollectionCard key={collection._id} data={collection} />
                    ))}
                  </div>
                  {loaded && collections.length === 0 ? (
                    <CollectionsEmptyPlaceholder />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

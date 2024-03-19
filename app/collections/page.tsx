"use client";
import { useState, useEffect } from "react";
import { Metadata } from "next";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "../../components/menu";
import { CollectionsEmptyPlaceholder } from "../../components/collections-empty-placeholder";
import { Sidebar } from "../../components/sidebar";
import { playlists } from "../../data/playlists";
import { CollectionCard } from "@/components/collections-card";
import { User } from "@/models/User";
import axios from "axios";
import Link from "next/link";
import { RequireAuthPlaceholder } from "@/components/require-auth-placeholder";
import { get } from "http";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Array<any>>([]);
  const [userCollections, setUserCollections] = useState<Array<any>>([]);
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState<User | null>(null);
  const [loadedAccount, setLoadedAccount] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    getCollections();
    if (!loaded && user) {
      getUserCollections(user._id);
    }
  }, [userCollections, loaded]);

  async function getCollections() {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections`
      );
      setCollections(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserCollections(userId: string) {
    const res = await axios.get("/api/collections/users", {
      params: { userId: userId },
    });
    const data = res.data;
    console.log(data);
    setUserCollections(data);
    setLoaded(true);
  }
  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4">
                <div className="col-span-4 lg:col-span-4 ">
                  <div className="bg-background ">
                    <div className="h-full px-4 py-6 lg:px-8">
                      <Tabs
                        defaultValue="allcollections"
                        className="h-full space-y-6"
                      >
                        <div className="space-between flex items-center">
                          <TabsList>
                            <TabsTrigger
                              value="allcollections"
                              className="relative"
                            >
                              All Collections
                            </TabsTrigger>
                            <TabsTrigger value="mycollections">
                              My Collections
                            </TabsTrigger>
                          </TabsList>
                          <div className="ml-auto ">
                            <Link href="/collections/create" passHref>
                              <Button size="sm" className="relative">
                                Create a Collection
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <TabsContent
                          value="allcollections"
                          className="border-none p-0 outline-none"
                        >
                          <div className="h-full px-4  lg:px-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                  Art Collections
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                  Use art collections to organize your art and
                                  train your custom AI art models.
                                </p>
                              </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                              {collections.map((collection) => (
                                <CollectionCard
                                  key={collection._id}
                                  data={collection}
                                />
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent
                          value="mycollections"
                          className="h-full flex-col border-none p-0 data-[state=active]:flex"
                        >
                          {account != null ? (
                            <div className="h-full px-4  lg:px-4">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <h2 className="text-2xl font-semibold tracking-tight">
                                    My Art Collections
                                  </h2>
                                  <p className="text-sm text-muted-foreground">
                                    Your art collections
                                  </p>
                                </div>
                              </div>
                              <Separator className="my-4" />
                              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                {userCollections.map((collection) => (
                                  <CollectionCard
                                    key={collection._id}
                                    data={collection}
                                  />
                                ))}
                              </div>
                              {loaded && userCollections.length === 0 ? (
                                <CollectionsEmptyPlaceholder />
                              ) : null}
                            </div>
                          ) : null}
                          {loadedAccount && !account ? (
                            <div className="m-12">
                              <RequireAuthPlaceholder />{" "}
                            </div>
                          ) : null}
                        </TabsContent>
                      </Tabs>
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

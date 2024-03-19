"use client";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Menu } from "../../components/menu";
import { TunedModelsEmptyPlaceholder } from "../../components/tunedmodels-empty-placeholder";
import { Sidebar } from "../../components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { playlists } from "../../data/playlists";
import { TunedModelCard } from "@/components/tuned-model-card";
import Link from "next/link";
import { User } from "@/models/User";
import axios from "axios";
import { RequireAuthPlaceholder } from "@/components/require-auth-placeholder";
import { get } from "http";

export default function TunedModels() {
  const [tunedmodels, setTunedModels] = useState<Array<any>>([]);
  const [userTunedModels, setUserTunedModels] = useState<Array<any>>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadedAccount, setLoadedAccount] = useState(true);
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    getTunedModels();
    if (!loaded && user) {
      getUserTunedModels(user._id);
    }
  }, [loaded, loadedAccount]);

  async function getTunedModels() {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tunedmodels`
      );
      setTunedModels(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserTunedModels(userId: string) {
    const res = await axios.get("/api/tunedmodels/users", {
      params: { userId: userId },
    });
    const data = res.data;
    console.log(data);
    setUserTunedModels(data);
    setLoaded(true);
  }
  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="allmodels" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="allmodels" className="relative">
                          All Custom Models
                        </TabsTrigger>
                        <TabsTrigger value="mymodels">
                          My Custom Models
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto ">
                        <Link href="/tunedmodels/create" passHref>
                          <Button size="sm" className="relative">
                            Create Custom Model
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <TabsContent
                      value="allmodels"
                      className="border-none p-0 outline-none"
                    >
                      <div className="h-full px-4  lg:px-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Custom Models
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Use custom AI art mdels to create art based on
                              your favorite style
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                          {tunedmodels.length > 0 &&
                            tunedmodels.map((tunedmodel) => (
                              <TunedModelCard
                                key={tunedmodel._id}
                                data={tunedmodel}
                              />
                            ))}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="mymodels"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      {account != null ? (
                        <div className="h-full px-4  lg:px-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h2 className="text-2xl font-semibold tracking-tight">
                                My Custom Models
                              </h2>

                              <p className="text-sm text-muted-foreground">
                                Custom AI art models based on your art
                                collections
                              </p>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                            {userTunedModels.length > 0 &&
                              userTunedModels.map((tunedmodel) => (
                                <TunedModelCard
                                  key={tunedmodel._id}
                                  data={tunedmodel}
                                />
                              ))}
                          </div>
                          {loaded && userTunedModels.length === 0 ? (
                            <TunedModelsEmptyPlaceholder />
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
    </>
  );
}

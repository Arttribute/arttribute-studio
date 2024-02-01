"use client";
import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { playlists } from "@/data/playlists";
import { User } from "@/models/User";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { formatCount } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { TunedModelCard } from "@/components/tuned-model-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CollectionCard } from "@/components/collections-card";
import FollowButton from "@/components/follow-button";
import PromptDisplayCard from "@/components/prompt-display-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PromptGalleryGrid from "@/components/prompt-gallery-grid";
import { Loader } from "lucide-react";

interface Params {
  params: {
    slug: string;
  };
}

export default function ArtistsPage({ params: { slug } }: Params) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData == null) {
      getUserByAddress(slug);
    }
  }, [userData]);

  async function getUserByAddress(web3Address: string): Promise<any> {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/users/${web3Address}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("User data", data);
    setUserData(data);
    setLoading(false);
  }

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar
                playlists={playlists}
                className="hidden lg:block col-span-1"
              />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                {loading ? (
                  <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed m-8">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                      <Loader className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                ) : (
                  <div className="h-full px-4 py-6 lg:px-8 col-span-4">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="relative">
                        <div className="rounded-full overflow-hidden">
                          <Image
                            src={userData?.user?.picture}
                            alt={userData?.user?.name}
                            width={150}
                            height={150}
                            className="object-cover aspect-square"
                          />
                        </div>
                        {/*<FollowButton uid={userData?.user?._id} />*/}
                      </div>

                      <div className="flex md:flex-grow flex-col space-y-1">
                        <h2 className="flex items-center text-lg sm:text-2xl font-semibold tracking-tight">
                          {userData?.user?.name}
                          {userData?.user?.featured && (
                            <CheckCircle className="ml-1 h-4 w-4 text-sky-600" />
                          )}
                        </h2>
                        <p className="text-base text-muted-foreground">
                          {userData?.user?.description || "No bio"}
                        </p>
                        <p>
                          {userData?.user?.tags?.map(
                            (
                              tag:
                                | string
                                | number
                                | boolean
                                | ReactElement<
                                    any,
                                    string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | ReactPortal
                                | PromiseLikeOfReactNode
                                | null
                                | undefined,
                              i: Key | null | undefined
                            ) => (
                              <span key={i} className="text-xs text-foreground">
                                #{tag} {i !== 2 && " • "}
                              </span>
                            )
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Joined on{" "}
                          {new Date(
                            userData?.user?.createdAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col items-center w-16 sm:w-20">
                          <p className="text-xl font-semibold tracking-tight">
                            {formatCount(userData?.prompts?.length || 0)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Creations
                          </p>
                        </div>
                        <div className="flex flex-col items-center w-16 sm:w-20">
                          <p className="text-xl font-semibold tracking-tight">
                            {formatCount(
                              userData?.user?.followers?.length || 0
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Followers
                          </p>
                        </div>
                        <div className="flex flex-col items-center w-16 sm:w-20">
                          <p className="text-xl font-semibold tracking-tight">
                            {formatCount(
                              userData?.user?.following?.length || 0
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Following
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <Tabs defaultValue="creations" className="h-full space-y-6">
                      <div className="space-between flex items-center">
                        <TabsList>
                          <TabsTrigger value="creations" className="relative">
                            Creations
                          </TabsTrigger>
                          <TabsTrigger value="collections">
                            Collections
                          </TabsTrigger>
                          <TabsTrigger value="models">Models</TabsTrigger>
                        </TabsList>
                      </div>

                      {userData && (
                        <div>
                          <TabsContent
                            value="creations"
                            className="border-none p-0 outline-none"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h2 className="text-xl font-semibold tracking-tight">
                                  Creations
                                </h2>

                                {userData?.prompts?.length !== 0 ? (
                                  <div className="flex">
                                    <div className="container mx-auto p-4">
                                      <PromptGalleryGrid
                                        prompts={userData.prompts}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <p>No works yet</p>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent
                            value="collections"
                            className="border-none p-0 outline-none"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h2 className="text-xl font-semibold tracking-tight">
                                  Collections
                                </h2>

                                {userData?.collections.length !== 0 ? (
                                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {userData.collections.map(
                                      (collection: any) => (
                                        <CollectionCard
                                          key={collection._id}
                                          data={collection}
                                        />
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <p>No collections yet</p>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent
                            value="models"
                            className="border-none p-0 outline-none"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h2 className="text-xl font-semibold tracking-tight">
                                  Models
                                </h2>

                                {userData?.tunedModels.length !== 0 ? (
                                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                                    {userData.tunedModels.map(
                                      (tunedmodel: any) => (
                                        <TunedModelCard
                                          key={tunedmodel._id}
                                          data={tunedmodel}
                                        />
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <p>No tuned models yet</p>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                        </div>
                      )}
                    </Tabs>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

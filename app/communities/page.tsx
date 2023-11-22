import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CollectionArtwork } from "../../components/collection-artwork";
import { CommunityInfoCard } from "../../components/community-info-card";
import { Sidebar } from "../../components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "../../data/albums";
import { playlists } from "../../data/playlists";
import { CommunityCard } from "@/components/community-card";
import Link from "next/link";
import { Menu } from "../../components/menu";

async function getData() {
  const communities = await fetch(
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/communities`
  );

  if (!communities.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return communities.json();
}

export default async function CommunitiesPage() {
  const communities = await getData();
  return (
    <>
      <div className="">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs
                    defaultValue="communities-general"
                    className="h-full space-y-6"
                  >
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger
                          value="communities-general"
                          className="relative"
                        >
                          Artrribute Communities
                        </TabsTrigger>
                        <TabsTrigger value="browse-communities">
                          Browse Comunities
                        </TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          Create Community
                        </TabsTrigger>
                      </TabsList>

                      <div className="ml-auto">
                        <Link href="/communities/create" passHref>
                          <Button size="sm" className="relative">
                            Create a Community
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <TabsContent
                      value="communities-general"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-3xl font-semibold tracking-tight">
                            What are Arttribute Communities
                          </h2>
                          <p className="text-lg text-muted-foreground">
                            Welcome to the vibrant world of Arttribute
                            Communities, where artistry meets innovation! 🎨✨
                            In the heart of Arttribute Studio, Communities are
                            like galleries of inspiration crafted by our diverse
                            community of artists. These are not just spaces;
                            they are living, breathing collections of fine-tuned
                            artistic models, each a testament to the unique
                            styles and visions of our talented creators.
                          </p>

                          <div className="flex gap-4 pt-10 md:flex-nowrap sm:flex-wrap">
                            <CommunityInfoCard
                              data={{
                                title: "A Symphony of Styles",
                                description:
                                  "Imagine having access to a multitude of artistic voices, all distinct, all waiting for you to explore. Our Communities are not just singular models; they are symphonies of styles brought by combining multiple fine-tuned models, offering a delightful blend of palettes, strokes, and expressions.",
                              }}
                            />

                            <CommunityInfoCard
                              data={{
                                title: "Play, Remix, Create",
                                description:
                                  "As a member of an Arttribute Community, you don't just witness art—you co-create it. Our tuned models are your artistic companions, ready to play, remix, and collaborate in the creation of something truly unique. Dive into the shared pool of models, experiment with different combinations, and let your creativity flow.",
                              }}
                            />

                            <CommunityInfoCard
                              data={{
                                title: "Connect with Fellow Creators",
                                description:
                                  "Communities are not just about models; they are about connections. Engage with fellow creators, exchange insights, and embark on collaborative projects. The Arttribute ecosystem is a thriving community where artists inspire, learn, and grow together.",
                              }}
                            />
                          </div>

                          <div className="w-full py-5 mx-5 flex justify-center">
                            <TabsList className="w-full">
                              <TabsTrigger
                                className="w-full flex justify-center py-3 rounded-md gap-2 bg-stone-950 hover:bg-stone-900 text-white dark:text-stone-950 dark:bg-white"
                                value="browse-communities"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                  <circle cx="8" cy="8" r="3.8" />
                                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                  <circle cx="17" cy="9" r="3.4" />
                                </svg>
                                Check out our Communities
                              </TabsTrigger>
                            </TabsList>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </TabsContent>

                    {/* ================================================================================ */}
                    <TabsContent
                      value="browse-communities"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Eplore Different Communities
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="w-full">
                        <div className="flex justify-center items-center gap-2 flex-wrap space-x-4 gap-y-5 pb-4">
                          {communities.map((community: any) => (
                            <CommunityCard
                              key={community._id}
                              data={community}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Community Creations
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          See what different communities have created
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

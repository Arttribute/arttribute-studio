import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { playlists } from "@/data/playlists";
import { User } from "@/models/User";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { formatCount } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { CommunityCard } from "@/components/community-card";
import { TunedModelCard } from "@/components/tuned-model-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { madeForYouAlbums } from "@/data/albums";
import { CollectionArtwork } from "@/components/collection-artwork";
import { CollectionCard } from "@/components/collections-card";
import FollowButton from "@/components/follow-button";

interface Params {
  params: {
    slug: string;
  };
}
// const models = [
//   {
//     _id: { $oid: "6558fc6c3a1063879f1ef3fb" },
//     model_id: "876612",
//     model_name: "Bashy's brush model",
//     description: "A tuned model trained on my art collection.",
//     status: "created-training",
//     display_image:
//       "https://bafybeicbflugtfgx3fr6eq7pwqq67c5nmf3azpuro74gnkeqfgkn7b75qi.ipfs.w3s.link/123.jpeg",
//     owner: { $oid: "655775e3c989f86bc5fc5827" },
//     license: "BYSA",
//     token: "sks",
//     slug: "bashy's-brush-model-a2857c64-41f5-4d7c-99fc-76fe4859501e",
//     model_uuid: "a2857c64-41f5-4d7c-99fc-76fe4859501e",
//     example_prompt: "",
//     prompt_count: 3,
//     expires_at: 1702922604291,
//     createdAt: 1700330604295,
//     updatedAt: 1700582138705,
//     __v: 0,
//   },
//   {
//     _id: { $oid: "65577a0729de27ec3d126266" },
//     model_id: "874702",
//     model_name: "PanAfricaModel",
//     description: "A tuned model trained on my african art collection.",
//     status: "created-training",
//     display_image:
//       "https://bafybeidcyoc6tix6qmolvohas5kr6ypv7uvxbvjhkzqnei2k3shvpw3tva.ipfs.w3s.link/pic1.jpg",
//     owner: "6550dac1e8faf5719ccff30c",
//     license: "BYSA",
//     token: "sks",
//     slug: "panafricamodel-18ff4765-9b4d-4316-9ca0-86cb48193ca0",
//     model_uuid: "18ff4765-9b4d-4316-9ca0-86cb48193ca0",
//     example_prompt: "",
//     prompt_count: 4,
//     expires_at: 1702823687824,
//     createdAt: 1700231687830,
//     updatedAt: 1700331914198,
//     __v: 0,
//   },
//   {
//     _id: { $oid: "65573183bcecfbe82a04a032" },
//     model_id: "874214",
//     model_name: "PanAfrica",
//     description: "A model that generates art through African Eyes",
//     status: "created-training",
//     display_image:
//       "https://bafybeidcyoc6tix6qmolvohas5kr6ypv7uvxbvjhkzqnei2k3shvpw3tva.ipfs.w3s.link/pic1.jpg",
//     owner: "6550dac1e8faf5719ccff30c",
//     license: "BYSA",
//     token: "sks",
//     slug: "panafrica-9bfd2e1e-bfe5-438c-bbb1-3ba00fe0b58f",
//     model_uuid: "9bfd2e1e-bfe5-438c-bbb1-3ba00fe0b58f",
//     example_prompt: "",
//     prompt_count: 0,
//     expires_at: 1702805123438,
//     createdAt: 1700213123440,
//     updatedAt: 1700213123440,
//     __v: 0,
//   },
// ];

// const communities = [
//   {
//     _id: { $oid: "65590805f86dc9a9cf3f95f7" },
//     name: "Artrribute Community",
//     description: "A community with my favorite models.",
//     members: [{ $oid: "65527151b7d6d887072456c5" }],
//     models: [
//       { $oid: "655240115493a9d3d2b0bf39" },
//       { $oid: "6558fc6c3a1063879f1ef3fb" },
//       { $oid: "6557317abcecfbe82a04a030" },
//     ],
//     display_image:
//       "https://bafybeibtphwyc4sipw6ippiyzc7ns7pcpmyxqsyyepaxgytpitkhfwcn44.ipfs.w3s.link/camera.jpg",
//     banner_image:
//       "https://bafybeif3k36qoysgc32pyoytab7i4i4ipucjfxzqpy4f25fcttx5zii2ce.ipfs.w3s.link/banner.jpg",
//     slug: "artrribute-community-7af46b1d-5d9e-47dc-8b18-fa5572641945",
//     community_uuid: "7af46b1d-5d9e-47dc-8b18-fa5572641945",
//     createdAt: 1700333573121,
//     updatedAt: 1700333573121,
//     __v: 0,
//   },
//   {
//     _id: { $oid: "655781a4feb89508839552cb" },
//     name: "African Warriors",
//     description:
//       "This community embraces African art and seeks to empower African artists",
//     members: [{ $oid: "6550dac1e8faf5719ccff30c" }],
//     models: [
//       { $oid: "65573183bcecfbe82a04a032" },
//       { $oid: "655240115493a9d3d2b0bf39" },
//       { $oid: "65548afafd755fbf4b1bb463" },
//       { $oid: "65577a0729de27ec3d126266" },
//     ],
//     display_image:
//       "https://bafybeih6paq3f6g3ybgzcrgpy76gd2cnzlmh4zwzu5iu3yqblohiya5wwu.ipfs.w3s.link/9460195-GFWHGIQT-7.jpg",
//     banner_image:
//       "https://bafybeibaqtjurzlndkoeswamslylzsudqpuvdnngnd6bobnyyi54ikp76e.ipfs.w3s.link/360_F_281611354_7XQmYcPREIohYCUPkxWz07oMIf1D30t0.jpg",
//     slug: "african-warriors-ce25aa6b-4e64-441e-a72e-d51bb5e20c7b",
//     community_uuid: "ce25aa6b-4e64-441e-a72e-d51bb5e20c7b",
//     createdAt: 1700233636551,
//     updatedAt: 1700233636551,
//     __v: 0,
//   },
//   {
//     _id: { $oid: "65578033feb89508839552c9" },
//     name: "Pixel Morans",
//     description: "A community dedicated to creating the best AI pixel art",
//     members: [
//       { $oid: "6550dac1e8faf5719ccff30c" },
//       { $oid: "655b4bd1f05d409db644bf05" },
//     ],
//     models: [
//       { $oid: "65548afafd755fbf4b1bb463" },
//       { $oid: "655240115493a9d3d2b0bf39" },
//     ],
//     display_image:
//       "https://bafybeib2kj52glyzjbhxdnh3fxpdllocycooru2logftknndwot4a7ah6u.ipfs.w3s.link/1_1xhHR7VxEkwg8OG9nSy0jg.png",
//     banner_image:
//       "https://bafybeiewuubje6isngeonjnagcb2kff3sq35pr7hsc3kypl7plycxzqtzm.ipfs.w3s.link/10 Most Famous Modern Art Paintings By Renowned Artists.jpg",
//     slug: "pixel-morans-bfcfb246-fbc7-456f-98e2-992d0c57b5ab",
//     community_uuid: "bfcfb246-fbc7-456f-98e2-992d0c57b5ab",
//     createdAt: 1700233267728,
//     updatedAt: 1700233267728,
//     __v: 0,
//   },
// ];

// const collections = [
//   {
//     _id: { $oid: "655cd6f7912eb62a934d835a" },
//     collection_name: "Aniimal Art Collection",
//     description: "A collection of my favorite animal art pieces.",
//     images: [
//       "https://bafybeicbflugtfgx3fr6eq7pwqq67c5nmf3azpuro74gnkeqfgkn7b75qi.ipfs.w3s.link/123.jpeg",
//       "https://bafybeieti6ckp536cjx5kwthswivzq6kgskh7tt6tuh4rcfpkoe2hcvdyq.ipfs.w3s.link/456.jpeg",
//       "https://bafybeihxnesolked7vr35assfoim4tzd7dp5agky6c3dejms6thfc7ahxi.ipfs.w3s.link/789.jpeg",
//       "https://bafybeighxycatyjdto4tcsqyf6lyklmcbpqxksg5drssuigteq4wkbkkdu.ipfs.w3s.link/890.jpeg",
//       "https://bafybeicuqmlyrmt3fkvmg3u3lgy56vkv4bfkqufiv6hc4oeuvd7sgnbjpq.ipfs.w3s.link/892.jpeg",
//       "https://bafybeiceo4oz4kph5stz2dbgmrf2lowbf46arndvyfihymmie625jtgqjm.ipfs.w3s.link/dog.jpeg",
//       "https://bafybeiekwr4ic4ajzsd4wxgph5cn5u3ht75bwulf5zopjb3ftnfjz2icmi.ipfs.w3s.link/eagle.jpeg",
//     ],
//     owner: { $oid: "655cc4ac7bf17c7b35b7ac35" },
//     license: "BYSA",
//     slug: "my-new-art-collection",
//     featured: false,
//     createdAt: 1700583159609,
//     updatedAt: 1700583159609,
//     __v: 0,
//   },
//   {
//     _id: { $oid: "6558f8ba3a1063879f1eec10" },
//     collection_name: "Bashy's brush collection",
//     description: "A collection of my favorite art pieces.",
//     images: [
//       "https://bafybeicbflugtfgx3fr6eq7pwqq67c5nmf3azpuro74gnkeqfgkn7b75qi.ipfs.w3s.link/123.jpeg",
//       "https://bafybeieti6ckp536cjx5kwthswivzq6kgskh7tt6tuh4rcfpkoe2hcvdyq.ipfs.w3s.link/456.jpeg",
//       "https://bafybeihxnesolked7vr35assfoim4tzd7dp5agky6c3dejms6thfc7ahxi.ipfs.w3s.link/789.jpeg",
//       "https://bafybeighxycatyjdto4tcsqyf6lyklmcbpqxksg5drssuigteq4wkbkkdu.ipfs.w3s.link/890.jpeg",
//       "https://bafybeicuqmlyrmt3fkvmg3u3lgy56vkv4bfkqufiv6hc4oeuvd7sgnbjpq.ipfs.w3s.link/892.jpeg",
//       "https://bafybeiceo4oz4kph5stz2dbgmrf2lowbf46arndvyfihymmie625jtgqjm.ipfs.w3s.link/dog.jpeg",
//       "https://bafybeiekwr4ic4ajzsd4wxgph5cn5u3ht75bwulf5zopjb3ftnfjz2icmi.ipfs.w3s.link/eagle.jpeg",
//     ],
//     owner: { $oid: "655775e3c989f86bc5fc5827" },
//     license: "BYSA",
//     slug: "bashy's-brush-collection-6c891f86-60dc-4dc9-8b4c-c45dbf3eedd8",
//     collection_uuid: "6c891f86-60dc-4dc9-8b4c-c45dbf3eedd8",
//     createdAt: 1700329658154,
//     updatedAt: 1700329658154,
//     __v: 0,
//   },
// ];

const getUserByAddress = async (web3Address: string) => {
  const res = await fetch(`http://localhost:3000/api/users/${web3Address}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};

export default async function ArtistsPage({ params: { slug } }: Params) {
  const user: User = await getUserByAddress(slug);

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-10 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar
                playlists={playlists}
                className="hidden lg:block col-span-1"
              />
              <div className="h-full px-4 py-6 lg:px-8 col-span-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="relative">
                    <div className="rounded-full overflow-hidden">
                      <Image
                        src={user.picture}
                        alt={user.name}
                        width={150}
                        height={150}
                        className="object-cover aspect-square"
                      />
                    </div>
                    <FollowButton uid={user._id} />
                  </div>

                  <div className="flex md:flex-grow flex-col space-y-1">
                    <h2 className="flex items-center text-lg sm:text-2xl font-semibold tracking-tight">
                      {user.name}
                      {user.featured && (
                        <CheckCircle className="ml-1 h-4 w-4 text-sky-600" />
                      )}
                    </h2>
                    <p className="text-base text-muted-foreground">
                      {user.description || "No bio"}
                    </p>
                    <p>
                      {user.tags?.map((tag, i) => (
                        <span key={i} className="text-xs text-foreground">
                          #{tag} {i !== 2 && " • "}
                        </span>
                      ))}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined on{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center w-16 sm:w-20">
                      <p className="text-xl font-semibold tracking-tight">
                        {formatCount(user.works?.length || 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Works</p>
                    </div>
                    <div className="flex flex-col items-center w-16 sm:w-20">
                      <p className="text-xl font-semibold tracking-tight">
                        {formatCount(user.followers?.length || 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div className="flex flex-col items-center w-16 sm:w-20">
                      <p className="text-xl font-semibold tracking-tight">
                        {formatCount(user.following?.length || 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                {user && (
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight">
                          Member&apos;s Collections
                        </h2>
                        <ScrollArea className="w-[90vw] md:w-[95vw] lg:w-[75vw] whitespace-nowrap">
                          {/* TODO: change to actual user collections */}
                          <div className="flex w-max space-x-4 p-4">
                            {user.collections.length !== 0 ? (
                              user.collections.map((collection: any) => (
                                <div key={collection._id} className="w-60">
                                  <CollectionCard data={collection} />
                                </div>
                              ))
                            ) : (
                              <p>No collections yet</p>
                            )}
                          </div>

                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight">
                          Member&apos;s Models
                        </h2>
                        <ScrollArea className="w-[90vw] md:w-[95vw] lg:w-[75vw] whitespace-nowrap">
                          {/* TODO: change to actual user models */}
                          <div className="flex w-max space-x-4 p-4">
                            {user.models.length !== 0 ? (
                              user.models.map((model: any) => (
                                <div
                                  key={model._id}
                                  className="border-2 rounded-md"
                                >
                                  <TunedModelCard data={model} />
                                </div>
                              ))
                            ) : (
                              <p>No models tuned yet</p>
                            )}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight">
                          Member&apos;s Works
                        </h2>
                        <ScrollArea className="w-[90vw] md:w-[95vw] lg:w-[75vw] whitespace-nowrap">
                          <div className="flex w-max space-x-4 p-4">
                            {user.works.length !== 0 ? (
                              user.works.map((work: any) => (
                                <CollectionArtwork
                                  key={work._id}
                                  album={work}
                                  className="w-[150px]"
                                  aspectRatio="square"
                                  width={150}
                                  height={150}
                                />
                              ))
                            ) : (
                              <p>No works yet</p>
                            )}
                            {/* TODO: This is temporary */}

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
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight">
                          Member&apos;s Communities
                        </h2>
                        <ScrollArea className="w-[90vw] md:w-[95vw] lg:w-[75vw] whitespace-nowrap">
                          <div className="flex w-max space-x-4 p-4">
                            {/* TODO: change to actual user communities */}
                            {user.communities.length !== 0 ? (
                              user.communities.map((community: any) => (
                                // TODO: issue with md:max-w-[70%] in community-card.tsx
                                <CommunityCard
                                  key={community._id}
                                  data={community}
                                />
                              ))
                            ) : (
                              <p>No communities yet</p>
                            )}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </div>
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

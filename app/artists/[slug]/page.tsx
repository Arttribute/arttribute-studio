import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { playlists } from "@/data/playlists";
import { User } from "@/models/User";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { formatCount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Params {
  params: {
    slug: string;
  };
}

const getUserByAddress = async (web3Address: string) => {
  const res = await fetch(`http://localhost:3000/api/users/${web3Address}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};

export default async function ArtistsPage({ params: { slug } }: Params) {
  const user: User = await getUserByAddress(slug);

  const isFollowed = true;

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
                <div className="flex items-center space-x-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      src={user.picture}
                      alt={user.name}
                      width={150}
                      height={150}
                      className="object-cover aspect-square"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            className="rounded-full w-8 h-8 absolute bottom-0 right-0"
                          >
                            {isFollowed ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              <Plus className="h-5 w-5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isFollowed ? "Unfollow" : "Follow"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex flex-grow flex-col space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {user.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user.description || "No bio"}
                    </p>
                    <p>
                      {user.tags?.map((tag, i) => (
                        <span key={i} className="text-xs text-foreground">
                          #{tag} {i !== 2 && " • "}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center w-20">
                      <p className="text-2xl font-semibold tracking-tight">0</p>
                      <p className="text-sm text-muted-foreground">Works</p>
                    </div>
                    <div className="flex flex-col items-center w-20">
                      <p className="text-2xl font-semibold tracking-tight">
                        {formatCount(1000000)}
                      </p>
                      <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div className="flex flex-col items-center w-20">
                      <p className="text-2xl font-semibold tracking-tight">
                        {formatCount(0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  {user && (
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col space-y-2">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {user.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {user.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

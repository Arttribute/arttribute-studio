import { Menu } from "../../components/menu";
import { Sidebar } from "../../components/sidebar";
import { playlists } from "../../data/playlists";
import ArtistCard from "@/components/artist-card";
import { Separator } from "@/components/ui/separator";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const getUsers = async () => {
  await dbConnect();
  const users = await User.find().sort({ createdAt: -1 });
  return users;
};

export default async function ArtistsPage() {
  const users: any = await getUsers();

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
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Artists
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Various artists on Arttribute
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {users &&
                      users.map((user: any) => (
                        <ArtistCard key={user._id} user={user} />
                      ))}
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

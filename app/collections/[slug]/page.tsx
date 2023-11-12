import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";

import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { playlists } from "@/data/playlists";
import CollectionGalleryGrid from "@/components/collection-gallery-grid";
import { mockImages } from "@/data/mockimages";

export default function MusicPage() {
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
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Collection Name
                    </h2>
                    <div className="flex mb-4">
                      <p className="text-sm text-muted-foreground">
                        By Collection Author
                      </p>
                      <p className="text-sm text-muted-foreground ml-3">
                        BY NC
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground ">
                      A collection of watercolor paintings that beautifully
                      capture the essence of the animal kingdom.Step into a
                      world where vibrant colors merge seamlessly, breathing
                      life into majestic creatures that roam the Earth.
                    </p>

                    <Separator className="my-4" />
                    <div className="flex items-center justify-between p-5">
                      <CollectionGalleryGrid
                        images={mockImages}
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

// components/CollectionGalleryGrid.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ArtGalleryGridProps {
  data: { src: string; alt: string }[];
}

const ArtGalleryGrid: React.FC<ArtGalleryGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.map((data, index) => (
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <Dialog>
                <DialogTrigger>
                  <Image
                    src={data.src}
                    alt={data.alt}
                    width={500}
                    height={300}
                    objectFit="cover"
                    className={cn(
                      "h-auto w-auto object-cover transition-all hover:scale-105",
                      "aspect-[3/4]"
                    )}
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Collection Name Art</DialogTitle>
                    <DialogDescription>Image {index}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Image
                        src={data.src}
                        alt={data.alt}
                        width={800}
                        height={300}
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </ContextMenuTrigger>
        </ContextMenu>
      ))}
    </div>
  );
};

export default ArtGalleryGrid;

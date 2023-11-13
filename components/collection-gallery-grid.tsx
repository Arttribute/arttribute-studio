// components/CollectionGalleryGrid.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CollectionGalleryGridProps {
  images: { src: string; alt: string }[];
  collectionName: string;
}

const CollectionGalleryGrid: React.FC<CollectionGalleryGridProps> = ({
  images,
  collectionName,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {images.map((images, index) => (
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="overflow-hidden rounded-md">
              <Dialog>
                <DialogTrigger>
                  <Image
                    src={images.src}
                    alt={images.alt}
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
                    <DialogTitle>{collectionName} Art</DialogTitle>
                    <DialogDescription>Image {index}</DialogDescription>
                  </DialogHeader>

                  <Image
                    src={images.src}
                    alt={images.alt}
                    width={300}
                    height={200}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </ContextMenuTrigger>
        </ContextMenu>
      ))}
    </div>
  );
};

export default CollectionGalleryGrid;

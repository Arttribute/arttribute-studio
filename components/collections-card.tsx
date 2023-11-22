"use client";
import {
  CircleIcon,
  PlusIcon,
  StarIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface CollectionCardProps {
  data: {
    collection_name: string;
    description: string;
    images: string[];
    license: string;
    slug: string;
  };
  className?: string;
}

export function CollectionCard({ data, className }: CollectionCardProps) {
  //return only first 4 images
  const images = data.images.slice(0, 4).map((image) => {
    return {
      src: image,
      alt: data.collection_name,
    };
  });
  return (
    <div className={`bg-blend-lighten hover:bg-blend-darken ${className}`}>
      <CardHeader className=" items-start gap-2 space-y-0 -m-4">
        <Link href={`/collections/${data.slug}`}>
          {images.length > 3 ? (
            <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-md">
              {images.map((images, index) => (
                <div className="relative">
                  <img
                    src={images.src}
                    alt={images.alt}
                    className={cn(
                      "h-auto w-auto object-cover transition-all ",
                      "aspect-[11/12]"
                    )}
                  />
                  <div className="absolute inset-0 bg-black opacity-10"></div>{" "}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-md">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className={cn(
                  "h-auto w-auto object-cover transition-all ",
                  "aspect-[11/12]"
                )}
              />
            </div>
          )}
        </Link>
      </CardHeader>
      <CardContent className="mt-1 -ml-2">
        <Link href={`/collections/${data.slug}`}>
          <h4 className="truncate">{data.collection_name}</h4>
        </Link>
        <p className="text-xs text-muted-foreground truncate">
          {" "}
          {data.description}{" "}
        </p>
        <p className="text-xs text-foreground truncate">
          {" "}
          {data.images.length} images
        </p>
      </CardContent>
    </div>
  );
}

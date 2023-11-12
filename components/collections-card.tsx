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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

interface CollectionCardProps {
  data: {
    collection_name: string;
    description: string;
    images: string[];
    license: string;
  };
}

export function CollectionCard({ data }: CollectionCardProps) {
  //return only first 4 images
  const images = data.images.slice(0, 4).map((image) => {
    return {
      src: image,
      alt: data.collection_name,
    };
  });
  return (
    <Card>
      <CardHeader className=" items-start gap-2 space-y-0 -m-4">
        <Link href={`/collections/${12345}`}>
          {images.length > 3 ? (
            <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-md">
              {images.map((images, index) => (
                <div className="relative">
                  <img
                    src={images.src}
                    alt={images.alt}
                    className="aspect-[5/4]"
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
                className="aspect-[5/4]"
              />
            </div>
          )}
        </Link>
      </CardHeader>
      <CardContent className="mt-1 -ml-2">
        <Link href={`/collections/${12345}`}>
          <h4>{data.collection_name}</h4>
        </Link>
        <p className="text-xs text-muted-foreground"> {data.description} </p>
        <p className="text-xs text-foreground"> {data.images.length} images</p>
      </CardContent>
    </Card>
  );
}

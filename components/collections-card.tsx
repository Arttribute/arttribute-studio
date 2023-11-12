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

const images = [
  {
    alt: "React Rendezvous",
    src: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
  },
  {
    alt: "Async Awakenings",
    src: "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    alt: "The Art of Reusability",
    src: "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
  },
  {
    alt: "Stateful Symphony",
    src: "https://github.com/shadcn.png",
  },
];
export function CollectionCard() {
  return (
    <Card>
      <CardHeader className=" items-start gap-2 space-y-0 -m-4">
        <Link href={`/collections/${12345}`}>
          <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-md">
            {images.map((images, index) => (
              <Image
                src={images.src}
                alt={images.alt}
                width={300}
                height={80}
                objectFit="cover"
                className="aspect-[5/4]"
              />
            ))}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="mt-1 -ml-2">
        <Link href={`/collections/${12345}`}>
          <h4>My Art collection</h4>
        </Link>
        <p className="text-xs text-muted-foreground">
          {" "}
          Breif description of the model
        </p>
        <p className="text-xs text-foreground"> 10 images</p>
      </CardContent>
    </Card>
  );
}

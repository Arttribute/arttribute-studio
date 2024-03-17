"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { BadgeCheck, Box, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";

function ModelItem({ model }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <div
      className="relative w-72 border rounded-lg p-1 m-0.5 hover:border-2 transition-all duration-100 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-lg aspect-[1]">
        {/* Image */}
        <Image
          src="/studiomodel.webp"
          alt={model.model_name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        {/* Dark overlay that appears on hover */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-400 ease-in-out ${
            isHovered ? "opacity-10 rounded-lg" : "opacity-0 rounded-lg"
          }`}
        ></div>
      </div>

      <div className="m-2">
        <p className="flex text-xs text-gray-500 font-medium">
          by {model.model_name}{" "}
          <BadgeCheck className="h-3.5 w-3.5 m-0.5 text-blue-500" />
        </p>
        <p className="text-md font-semibold">{model.model_name}</p>

        <div className="text-xs text-gray-500 font-medium mt-1">
          <p className="flex ">
            <Sparkles className="h-3 w-3 ml-0 m-0.5" /> art created with this
            model: {model.prompt_count}{" "}
          </p>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center bg-transparent transition-opacity duration-200 ease-in ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ transform: "translateY(20px)" }}
        >
          <Link href={`/tunedmodels/${model.slug}`}>
            <Button
              variant="outline"
              className="mt-2 w-full bg-white rounded-lg"
            >
              <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Generate art with this model
              </p>
              <Sparkles className="h-4 w-4 ml-2 inline-block text-indigo-500" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeaturedModels({ models }: { models: any }) {
  return (
    <>
      <div className="rounded-lg border p-10">
        <div className="space-between flex items-center mb-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Featured models
            </h2>
          </div>

          <div className="ml-auto">
            <Link href="/collections/create">
              <div className="flex ">
                <p className="text-sm  font-medium">Explore all models</p>
                <ChevronRight className="h-4 w-4  m-0.5" />
              </div>
            </Link>
          </div>
        </div>
        <Separator className="my-1" />
        <div className="relative mt-6">
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {models.map((model: any) => (
                <ModelItem key={model._id} model={model} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Link href="/collections/create">
            <Button variant="outline" size="sm" className="mt-2 w-full">
              <div className="flex text-purple-500">
                <p className="text-sm  font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Create your own custom AI art model
                </p>
                <Box className="h-4 w-4  m-0.5" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

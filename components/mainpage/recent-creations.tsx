import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { ArrowRight } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Sparkles } from "lucide-react";

import PromptGalleryGrid from "../prompt-gallery-grid";

export function RecentCreations({ creations }: { creations: any }) {
  //show only 10 recent creations
  creations = creations.slice(0, 12);
  return (
    <>
      <div className="rounded-lg border p-10">
        <div className="space-between flex items-center mb-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Recent creations
            </h2>
          </div>

          <div className="ml-auto">
            <Link href="/collections/create">
              <div className="flex ">
                <p className="text-sm  font-medium">Explore more creations</p>
                <ChevronRight className="h-4 w-4  m-0.5" />
              </div>
            </Link>
          </div>
        </div>
        <Separator className="my-1" />
        <div className=" mt-6">
          <PromptGalleryGrid prompts={creations} />
        </div>
        <div className="mt-4 p-2 border rounded-lg">
          <Link href="/collections/create">
            <Button variant="outline" size="sm" className="w-full">
              <div className="flex text-purple-500">
                <p className="text-sm  font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Create art with AI
                </p>
                <Sparkles className="h-4 w-4 ml-2 inline-block text-indigo-500" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

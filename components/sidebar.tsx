"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";

import { CreateNewDialog } from "./create-new-dialog";

import {
  Box,
  BookImage,
  Brush,
  Home,
  LibraryBig,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

export function Sidebar({ className }: any) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 fixed top-8 left-0 overflow-y-auto w-3/5 md:w-2/5 lg:w-1/5  mt-4 lg:border-r  h-screen">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <div className="mt-4">
              <CreateNewDialog />
            </div>
            <Link href="/" passHref>
              <Button
                variant={pathname === "/" ? "secondary" : "ghost"}
                className="w-full justify-start py-6"
              >
                <Star size={24} className="text-pink-400 mr-2 h-4 w-4" />
                <p className="text-md font-smibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Discover
                </p>
              </Button>
            </Link>
            <Link href="/creations" passHref>
              <Button
                variant={pathname === "/creations" ? "secondary" : "ghost"}
                className="w-full justify-start py-6"
              >
                <Sparkles size={24} className=" mr-2 h-4 w-4" />
                Creations
              </Button>
            </Link>
            <Link href="/model" passHref>
              <Button
                variant={pathname === "/models" ? "secondary" : "ghost"}
                className="w-full justify-start py-6"
              >
                <Box size={24} className=" mr-2 h-4 w-4" />
                Models
              </Button>
            </Link>
            <Link href="/challenges" passHref>
              <Button
                variant={pathname === "/challenges" ? "secondary" : "ghost"}
                className="w-full justify-start py-6"
              >
                <Trophy size={24} className=" mr-2 h-4 w-4" />
                Challenges
              </Button>
            </Link>
            <Link href="/artists" passHref>
              <Button
                variant={pathname === "/artists" ? "secondary" : "ghost"}
                className="w-full justify-start py-6 "
              >
                <Brush size={24} className=" mr-2 h-4 w-4" />
                Artists
              </Button>
            </Link>
            <Link href="/collections" passHref>
              <Button
                variant={pathname === "/collections" ? "secondary" : "ghost"}
                className="w-full justify-start py-6 "
              >
                <LibraryBig size={24} className=" mr-2 h-4 w-4" />
                Collections
              </Button>
            </Link>

            <Link href="/nfts" passHref>
              <Button
                variant={pathname === "/nfts" ? "secondary" : "ghost"}
                className="w-full justify-start py-6"
              >
                <BookImage size={24} className=" mr-2 h-4 w-4" />
                NFTs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

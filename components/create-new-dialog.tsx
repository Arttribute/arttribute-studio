"use client";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Box,
  LibraryBig,
  Plus,
  Sparkle,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Label } from "@radix-ui/react-context-menu";
export function CreateNewDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-start w-full my-4 py-6"
        >
          <Sparkle className="text-indigo-500 w-4 h-4 mr-2" />
          <p className="text-md font-smibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Create something new
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <DialogHeader>
          <DialogTitle>Create new</DialogTitle>
        </DialogHeader>

        <Link href="/tunedmodels/create" passHref>
          <div className="flex  rounded-md border border p-3">
            <Sparkles className="text-indigo-500 h-4 w-4 mr-2 m-1" />
            <p className="text-md"> AI art</p>
          </div>
        </Link>
        <Link href="/tunedmodels/create" passHref>
          <div className="flex  rounded-md border border p-3">
            <Box className="text-blue-500 h-4 w-4 mr-2 m-1" />
            <p className="text-md"> Custom model</p>
          </div>
        </Link>
        <Link href="/collections/create" passHref>
          <div className="flex  rounded-md border border p-3">
            <Trophy className="text-amber-500 h-4 w-4 mr-2 m-1" />
            <p className="text-md"> Challenge</p>
          </div>
        </Link>
        <Link href="/collections/create" passHref>
          <div className="flex  rounded-md border border p-3">
            <LibraryBig className=" h-4 w-4 mr-2 m-1" />
            <p className="text-md"> Art collection</p>
          </div>
        </Link>
        <Link href="/collections/create" passHref>
          <div className="flex  rounded-md border border p-3">
            <Users className=" h-4 w-4 mr-2 m-1" />
            <p className="text-md"> Community</p>
          </div>
        </Link>
      </DialogContent>
    </Dialog>
  );
}

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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-context-menu";
export function CreateNewDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <DialogHeader>
          <DialogTitle>Create New</DialogTitle>
        </DialogHeader>
        {/* <Link href="/imaginarium" passHref>
          <div className="flex  shrink-0  rounded-md border border p-3">
            <Label> Image generation</Label>
          </div>
        </Link> */}
        <Link href="/collections/create" passHref>
          <div className="flex  shrink-0  rounded-md border border p-3">
            <Label> Art collection</Label>
          </div>
        </Link>
        <Link href="/tunedmodels/create" passHref>
          <div className="flex  shrink-0  rounded-md border border p-3">
            <Label> Tuned model</Label>
          </div>
        </Link>
      </DialogContent>
    </Dialog>
  );
}

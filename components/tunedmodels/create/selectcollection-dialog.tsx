"use client";
import { useState } from "react";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { set } from "mongoose";

export default function SelectCollectionDialog({
  form,
  collections,
  loaded,
  setCollectionId,
}: {
  form: any;
  collections: {
    _id: string;
    collection_name: string;
  }[];
  loaded: boolean;
  setCollectionId: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const updateSelectedCollection = (value: string) => {
    setCollectionId(value);
    setIsOpen(false);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full">
          <div className="border border-slate-400  m-2 p-2 flex flex-col rounded-lg hover:bg-gray-50">
            <div className="flex items-center justify-center">
              <div className="text-sm  font-medium text-slate-500">
                Choose art collection
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Art Collection</FormLabel>
                <Select
                  onValueChange={(value) => updateSelectedCollection(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a collection of artwork to train your tuned model on" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {collections.length > 0 && loaded ? (
                      collections.map((collection) => (
                        <SelectItem
                          key={collection._id}
                          value={collection._id}
                          className="flex items-center space-x-2"
                        >
                          {collection.collection_name}
                        </SelectItem>
                      ))
                    ) : (
                      <Link href="/collections/create" className="p-2">
                        Create a new Collection
                      </Link>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Manage your art collections in the{" "}
                  <Link href="/collections" className=" underline">
                    collections tab
                  </Link>
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

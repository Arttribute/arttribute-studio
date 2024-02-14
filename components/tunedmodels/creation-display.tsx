import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import { VideoIcon } from "lucide-react";
import { BoxIcon } from "lucide-react";
import { IterationCcwIcon } from "lucide-react";
import { MoreHorizontalIcon } from "lucide-react";
import { Loader } from "lucide-react";
import { ArttributeIconWhite } from "../custom-icons";

export default function CreationDisplay({
  loadingImages,
  loadedImages,
  generatedImages,
}: {
  loadingImages: boolean;
  loadedImages: boolean;
  generatedImages: Array<string>;
}) {
  return (
    <>
      <div className="px-36">
        {loadedImages ? (
          <div className="rounded-md border-2 border-dashed p-2 m-4">
            <div
              className={`grid ${
                generatedImages.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {generatedImages.map((image, index) => {
                return (
                  <ContextMenu key={index}>
                    <ContextMenuTrigger>
                      <div className="overflow-hidden rounded">
                        <Dialog>
                          <DialogTrigger>
                            <div className="overflow-hidden rounded">
                              <div key={index}>
                                <Image
                                  src={image}
                                  alt="generated image"
                                  width={
                                    generatedImages.length === 1 ? 560 : 278
                                  }
                                  height={
                                    generatedImages.length === 1 ? 360 : 180
                                  }
                                  className={cn(
                                    "object-cover transition-all hover:scale-105 rounded",
                                    `${
                                      generatedImages.length === 1
                                        ? "aspect-[20/14.5] rounded"
                                        : "aspect-[20/14] rounded"
                                    }`
                                  )}
                                />
                              </div>
                            </div>
                          </DialogTrigger>

                          <DialogContent className="max-w-2xl">
                            <div className="m-0.5" />
                            <div
                              className="relative bg-cover bg-center bg-no-repeat rounded"
                              style={{
                                backgroundImage: `url(${image})`,
                                height: "76vh",
                                width: "100%",
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-bl from-black via-black/10 to-transparent rounded">
                                <div className="absolute top-0 right-0 p-5 flex flex-col space-y-2">
                                  <Button
                                    variant="ghost"
                                    className="text-white border rounded-md"
                                  >
                                    <BoxIcon className="mr-1" />
                                    3Dfy{" "}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="text-white border rounded-md"
                                  >
                                    <VideoIcon className="mr-1" />
                                    Vidfy{" "}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="text-white border rounded-md"
                                  >
                                    <IterationCcwIcon className="mr-1" />
                                    Iter
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="text-white border rounded-md"
                                  >
                                    <MoreHorizontalIcon className="mr-1" />
                                    More
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="grid w-full gap-2 ">
                              <Button>Mint and Print</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </ContextMenuTrigger>
                  </ContextMenu>
                );
              })}
            </div>
          </div>
        ) : loadingImages ? (
          <div className="rounded-md border-2 border-dashed p-1 m-4">
            <div className="animate-pulse rounded-md border  p-48 bg-slate-50 ">
              <div className="flex items-center justify-center">
                <Loader className="h-6 w-6 animate-spin" />
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border-2 border-dashed p-1 m-4">
            <div className="rounded-md border  p-40 bg-slate-50 ">
              <div className="flex items-center justify-center">
                {ArttributeIconWhite}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

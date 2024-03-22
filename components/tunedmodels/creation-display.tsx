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
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import { VideoIcon } from "lucide-react";
import { BoxIcon } from "lucide-react";
import { IterationCcwIcon } from "lucide-react";
import { MoreHorizontalIcon } from "lucide-react";
import { Loader2, Sparkles } from "lucide-react";
import { ArttributeIconWhite } from "../custom-icons";

import { SubmitCreation } from "@/components/challenges/submit-creation";
import { model } from "mongoose";
import { MintCreationDialog } from "./mint-creation-dialog";

export default function CreationDisplay({
  loadingImages,
  loadedImages,
  generatedImages,
  promptId,
  currentUserId,
  modelId,
}: {
  loadingImages: boolean;
  loadedImages: boolean;
  generatedImages: Array<string>;
  promptId: string;
  currentUserId: string;
  modelId: string;
}) {
  return (
    <>
      <div
        className={
          generatedImages.length === 2
            ? "px-2  flex items-center justify-center h-full"
            : "px-36 flex items-center justify-center h-full"
        }
      >
        {loadedImages ? (
          <div className="p-0.5 border border rounded-lg m-4">
            <div
              className={`grid ${
                generatedImages.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {generatedImages.map((image, index) => {
                return (
                  <ContextMenu key={index}>
                    <ContextMenuTrigger>
                      <div
                        className="overflow-hidden rounded-lg"
                        style={{ marginBottom: -6 }}
                      >
                        <Dialog>
                          <DialogTrigger>
                            <div className="overflow-hidden rounded">
                              <div key={index}>
                                <Image
                                  src={image}
                                  alt="generated image"
                                  width={
                                    generatedImages.length === 1
                                      ? 600
                                      : generatedImages.length === 2
                                      ? 426
                                      : 278
                                  }
                                  height={
                                    generatedImages.length === 1
                                      ? 400
                                      : generatedImages.length === 2
                                      ? 370
                                      : 180
                                  }
                                  className={cn(
                                    "object-cover transition-all hover:scale-105 rounded-lg ",
                                    `${
                                      generatedImages.length === 1
                                        ? "aspect-[20/14] rounded-lg"
                                        : generatedImages.length === 2
                                        ? "aspect-[20/19.5] rounded-lg m-0.5"
                                        : "aspect-[20/14] rounded-lg"
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
                                  <MintCreationDialog />
                                  <Button
                                    variant="ghost"
                                    className="text-white border rounded-lg"
                                  >
                                    <VideoIcon className="mr-1" />
                                    Vidfy{" "}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="text-white border rounded-lg"
                                  >
                                    <MoreHorizontalIcon className="mr-1" />
                                    More
                                  </Button>
                                  {/* <Button
                                    variant="ghost"
                                    className="text-white border rounded-lg"
                                  >
                                    <VideoIcon className="mr-1" />
                                    Vidfy{" "}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="text-white border rounded-lg"
                                  >
                                    <IterationCcwIcon className="mr-1" />
                                    Iter
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="text-white border rounded-lg"
                                  >
                                    <MoreHorizontalIcon className="mr-1" />
                                    More
                                  </Button> */}
                                </div>
                              </div>
                            </div>
                            <SubmitCreation
                              data={{
                                prompt_id: promptId,
                                image_url: image,
                                owner: currentUserId,
                                tunedmodel_id: modelId,
                              }}
                            />
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
          <div className="p-0 border border-neutral-300 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-lg m-4 w-[600px]">
            <div className="animate-pulse rounded-lg  p-48 bg-slate-50 ">
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-0.5 border border-neutral-300 to-pink-500 rounded-lg m-4 w-[600px]">
            <div className="rounded-lg p-40 bg-slate-50 ">
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

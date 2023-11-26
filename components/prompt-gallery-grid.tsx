// components/CollectionGalleryGrid.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtGalleryGridProps {
  prompts: {
    _id: string;
    owner: {
      _id: string;
      name: string;
      picture: string;
    };
    prompt_title: string;
    prompt_name: string;
    description: string;
    images: string[];
    text: string;
    negative_prompt: string;
    created_at: string;
    tunedmodel_id: {
      display_image: string;
      description: string;
      model_name: string;
      slug: string;
      license: string;
    };
  }[];
}

const PromptGalleryGrid: React.FC<ArtGalleryGridProps> = ({ prompts }) => {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-5 gap-2">
      {prompts &&
        prompts.map((prompt, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger>
              <div className="overflow-hidden rounded-md">
                <Dialog>
                  <DialogTrigger>
                    <Image
                      src={prompt.images[0]}
                      alt={prompt.text}
                      width={490}
                      height={490}
                      className={cn(
                        "h-auto w-auto object-cover transition-all hover:scale-105",
                        "aspect-[3/4]"
                      )}
                    />
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl h-5/6">
                    <ScrollArea className="h-6/6">
                      <DialogHeader>
                        <DialogTitle>
                          {prompt.prompt_title
                            ? prompt.prompt_title
                            : "Creation"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className=" col-span-3 overflow-hidden rounded-m mt-2">
                          <Image
                            src={prompt.images[0]}
                            alt={prompt.text}
                            width={490}
                            height={490}
                            className="aspect-[1]"
                          />
                        </div>
                        <div className="space-y-1 col-span-2 mr-4">
                          <div className="flex text-sm text-muted-foreground">
                            <Avatar className="h-10 w-10 m-2 ml-0">
                              <AvatarImage
                                src={prompt.owner?.picture} //TODO: add user image
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-md text-muted-foreground mt-4">
                              By {prompt.owner?.name}
                            </p>
                          </div>

                          <Label>Prompt</Label>

                          <Textarea placeholder={prompt.text} readOnly />

                          <Label>Negative Prompt</Label>
                          <Textarea
                            placeholder={prompt.negative_prompt}
                            readOnly
                          />
                          <Label>Model</Label>
                          <div className="flex  shrink-0  rounded-md border border p-1">
                            <Link
                              href={`/tunedmodels/${prompt.tunedmodel_id?.slug}`}
                            >
                              <div className="grid grid-cols-3 items-start gap-4 space-y-0 ">
                                <div className="hidden lg:flex items-center space-x-1 rounded-md ">
                                  <div className="overflow-hidden rounded-md">
                                    <Image
                                      src={prompt?.tunedmodel_id?.display_image}
                                      alt={prompt?.tunedmodel_id?.model_name}
                                      width={490}
                                      height={490}
                                      className="aspect-[1]"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1 col-span-3 lg:col-span-2 pt-2">
                                  <h1 className="text-1xl font-semibold tracking-tight">
                                    {prompt?.tunedmodel_id?.model_name}
                                  </h1>
                                  <p className="text-xs text-muted-foreground mt-2, mb-2">
                                    {prompt?.tunedmodel_id?.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div>
                            <p className="text-md text-muted-foreground mt-4">
                              License: {prompt.tunedmodel_id?.license}
                            </p>
                          </div>
                        </div>
                      </div>
                      {prompt.images.length > 1 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1 rounded-md mt-2">
                          {prompt.images.slice(1).map((image, index) => (
                            <div className="overflow-hidden" key={index}>
                              <Image
                                src={image}
                                alt={prompt.text}
                                width={200}
                                height={200}
                                className={cn(
                                  "h-auto w-auto object-cover transition-all hover:scale-80",
                                  "aspect-[3/4]"
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </ContextMenuTrigger>
          </ContextMenu>
        ))}
    </div>
  );
};

export default PromptGalleryGrid;

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
import { BadgeCheck, Sparkles } from "lucide-react";
import { SubmitCreation } from "./challenges/submit-creation";
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
    <div className="grid grid-cols-4 lg:grid-cols-6 gap-1">
      {prompts &&
        prompts.map((prompt, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger>
              <div className="overflow-hidden rounded-lg">
                <Dialog>
                  <DialogTrigger>
                    <Image
                      src={prompt.images[0]}
                      alt={prompt.text}
                      width={300}
                      height={300}
                      className={cn(
                        "object-cover transition-all rounded-lg hover:scale-105 ",
                        "aspect-[5/6]"
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
                            className="aspect-[1] rounded-lg"
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
                          <div className="flex rounded-lg border border p-1">
                            <Link
                              href={`/tunedmodels/${prompt.tunedmodel_id?.slug}`}
                            >
                              <div className="grid grid-cols-4 items-start gap-4 space-y-0 ">
                                <div className="hidden lg:flex items-center space-x-1 rounded-md ">
                                  <div className="col-span-1overflow-hidden rounded-md">
                                    <Image
                                      src={prompt?.tunedmodel_id?.display_image}
                                      alt={prompt?.tunedmodel_id?.model_name}
                                      width={490}
                                      height={490}
                                      className="aspect-[1] border rounded-md"
                                    />
                                  </div>
                                </div>
                                <div className=" col-span-3 lg:col-span-3 pt-2">
                                  <p className="flex text-xs text-gray-500 font-medium">
                                    by {prompt?.tunedmodel_id?.model_name}{" "}
                                    <BadgeCheck className="h-3.5 w-3.5 m-0.5 text-blue-500" />
                                  </p>
                                  <p className="text-xl font-semibold ">
                                    {prompt?.tunedmodel_id?.model_name}
                                  </p>
                                </div>
                              </div>
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
                          <div className="p-2" />
                          <div className="mt-4">
                            <SubmitCreation
                              promptId={prompt._id}
                              promptName={prompt.prompt_name}
                            />
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

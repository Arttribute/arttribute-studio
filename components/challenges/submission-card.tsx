// components/CollectionGalleryGrid.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import {
  Dialog,
  DialogContent,
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
import { BarChart, BadgeCheck, Plus, Sparkles, Vote } from "lucide-react";

interface PromptGallery {
  submission: {
    _id: string;
    image_url: string;
    votes: number;
    is_winner: boolean;
    title: string;
    owner: {
      _id: string;
      name: string;
      picture: string;
    };
    prompt_id: {
      _id: string;
      prompt_title: string;
      prompt_name: string;
      description: string;
      images: string[];
      text: string;
      negative_prompt: string;
      created_at: string;
    };
    tunedmodel_id: {
      display_image: string;
      description: string;
      model_name: string;
      slug: string;
      license: string;
    };
  };
  voteForSubmission: (submissionId: string) => void;
  className?: string;
}

const SubmissionCard: React.FC<PromptGallery> = ({
  submission,
  voteForSubmission,
  className,
}) => {
  return (
    <div className={className}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Dialog>
              <DialogTrigger>
                <Image
                  src={submission.image_url}
                  alt={submission.title}
                  width={500}
                  height={300}
                  className={cn(
                    " object-cover transition-all hover:scale-105",
                    "aspect-[3/4]"
                  )}
                />
              </DialogTrigger>

              <DialogContent className="max-w-4xl h-5/6">
                <ScrollArea className="h-6/6">
                  <DialogHeader>
                    <DialogTitle>
                      {submission.title ? submission.title : "Creation"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className=" col-span-3 overflow-hidden rounded-m mt-2">
                      <Image
                        src={submission.image_url}
                        alt={submission.title}
                        width={490}
                        height={490}
                      />
                    </div>
                    <div className="space-y-1 col-span-2 mr-4">
                      <div className="flex text-sm text-muted-foreground">
                        <Avatar className="h-10 w-10 m-2 ml-0">
                          <AvatarImage
                            src={submission.owner?.picture} //TODO: add user image
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-md text-muted-foreground mt-4">
                          By {submission.owner?.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Vote className="h-4 w-4" />
                        <p className="text-md text-muted-foreground">
                          {submission.votes}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => voteForSubmission(submission._id)}
                          className="p-2"
                        >
                          <Plus className="h-3 w-3" />
                          <p className="text-xs">Vote</p>
                        </Button>
                      </div>
                      <Label>Prompt</Label>
                      <div className="border p-2 rounded-lg mt-4">
                        <p className="text-xs text-muted-foreground ">
                          The prompt will be revealed after the challenge ends
                        </p>
                      </div>
                      {/*<Textarea placeholder={submission.prompt.text} readOnly />*/}

                      <Label>Negative Prompt</Label>
                      <div className="border p-2 rounded-lg mt-4">
                        <p className="text-xs text-muted-foreground">
                          The will be revealed once the challenge ends
                        </p>
                      </div>

                      {/*<Textarea placeholder={prompt.negative_prompt} readOnly />*/}
                      <Label>Model</Label>
                      <div className="flex  shrink-0  rounded-lg border border p-1">
                        <Link
                          href={`/tunedmodels/${submission.tunedmodel_id?.slug}`}
                        >
                          <div className="grid grid-cols-4 items-start gap-4 space-y-0 ">
                            <div className="hidden lg:flex items-center space-x-1 rounded-md ">
                              <div className="col-span-1overflow-hidden rounded-md">
                                <Image
                                  src={submission?.tunedmodel_id?.display_image}
                                  alt={submission?.tunedmodel_id?.model_name}
                                  width={490}
                                  height={490}
                                  className="aspect-[1] border rounded-md"
                                />
                              </div>
                            </div>
                            <div className=" col-span-3 lg:col-span-3 pt-2">
                              <p className="flex text-xs text-gray-500 font-medium">
                                by {submission?.tunedmodel_id?.model_name}{" "}
                                <BadgeCheck className="h-3.5 w-3.5 m-0.5 text-blue-500" />
                              </p>
                              <p className="text-xl font-semibold ">
                                {submission?.tunedmodel_id?.model_name}
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
                      {/* <div>
                        <p className="text-md text-muted-foreground mt-4">
                          License: {submission.tunedmodel_id?.license}
                        </p>
                      </div> */}
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
};

export default SubmissionCard;

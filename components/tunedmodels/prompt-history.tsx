import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function PromptHistory({
  prompts,
  userId,
  setPastPromptData,
}: {
  prompts: {
    images: string[];
    owner: {
      _id: string;
    };
  }[];
  userId: string;
  setPastPromptData: any;
}) {
  // Filter prompts by the current user and return array of images
  const currentUserPrompts =
    prompts && prompts.filter((prompt) => prompt.owner._id === userId);
  console.log("Current User Prompts", currentUserPrompts);
  console.log("User Id", userId);

  return (
    <>
      <div className="bg-background rounded p-1 h-screen">
        <div className=" m-1 p-3 rounded">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Your creations</div>
          </div>
          <ScrollArea className="h-72 p-1 rounded-md border">
            <div className="grid grid-cols-3">
              {currentUserPrompts &&
                currentUserPrompts.map((prompt, index) => {
                  return (
                    <div key={index} className="m-1">
                      <Image
                        src={prompt.images[0]}
                        alt="prompt"
                        width={100}
                        height={100}
                        className={cn(
                          "object-cover transition-all hover:scale-105 rounded",
                          "rounded"
                        )}
                        onClick={() => setPastPromptData(prompt)}
                      />
                    </div>
                  );
                })}
            </div>
          </ScrollArea>
        </div>
        <div className="m-2 p-2">Explore more creations</div>
        <div className="bg-slate-50 m-2 p-3 rounded">
          <ScrollArea className="h-44 p-1 rounded-md border">
            <div className="grid grid-cols-4">
              {prompts &&
                prompts.map((prompt, index) => {
                  return (
                    <div key={index} className="m-0.5">
                      <Image
                        src={prompt.images[0]}
                        alt="prompt"
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    </div>
                  );
                })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

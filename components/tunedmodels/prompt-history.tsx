import Image from "next/image";
import { mock } from "node:test";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const promptMedia = [
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
  "123",
];
export default function PromptHistory() {
  return (
    <>
      <div className="bg-slate-100 m-2 p-3 rounded">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Your recent creations</div>
        </div>
        <ScrollArea className="h-72 p-1 rounded-md border">
          <div className="grid grid-cols-4">
            {promptMedia.map((image, index) => {
              return (
                <div key={index} className="m-1">
                  <Image
                    src="https://github.com/shadcn.png"
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
      <div className="m-2 p-2">Explore creations by others</div>
      <div className="bg-slate-50 m-2 p-3 rounded">
        <ScrollArea className="h-44 p-1 rounded-md border">
          <div className="grid grid-cols-5">
            {promptMedia.map((image, index) => {
              return (
                <div key={index} className="m-0.5">
                  <Image
                    src="https://github.com/shadcn.png"
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
    </>
  );
}

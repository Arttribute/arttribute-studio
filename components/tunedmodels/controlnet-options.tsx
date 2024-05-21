"use client";
import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import SingleImageUpload from "../single-image-upload";

import { Fullscreen } from "lucide-react";

import { Button } from "@/components/ui/button";
//import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function ControlnetOptions({
  promptStrength,
  setPromptStrength,
  referenceImage,
  setReferenceImage,
  setOpenControlnetOptions,
}: {
  promptStrength: number;
  setPromptStrength: any;
  referenceImage: string;
  setReferenceImage: any;
  setOpenControlnetOptions: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [numSteps, setNumSteps] = useState(33);
  const [cfgScale, setCfgScale] = useState(5);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [scheduler, setScheduler] = useState("Euler");

  const handleOpenChange = () => {
    setIsOpen(!isOpen);
    setOpenControlnetOptions(!isOpen);
  };

  return (
    <>
      <div className="m-4 p-1 rounded-lg border border-neutral-300">
        <Collapsible
          open={isOpen}
          onOpenChange={handleOpenChange}
          className="rounded-md "
        >
          <CollapsibleTrigger asChild className="w-full ">
            <Button variant="ghost" className="px-7 w-full border-purple-500">
              <div className="mr-3">Image Remix w/AI </div>
              <Fullscreen className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="">
            <ScrollArea className="rounded-md p-2">
              <div className="mr-3 mt-2">
                <div className="flex flex-col items-center justify-between">
                  <Label>Reference image</Label>
                </div>
                <SingleImageUpload
                  imageUrl={referenceImage}
                  setImageUrl={setReferenceImage}
                />

                <Label>Prompt strength</Label>
                <div className="flex items-center justify-between">
                  <Slider
                    defaultValue={[promptStrength]}
                    min={0}
                    max={10}
                    onValueChange={(value) => setPromptStrength(Number(value))}
                  />
                  <div className="border rounded p-0.5 m-1 text-xs w-8 h-5.5 tems-center  pl-1">
                    {promptStrength / 10}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}

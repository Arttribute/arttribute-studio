import AdvancedOptions from "@/components/tunedmodels/advanced-options";
import ControlnetOptions from "@/components/tunedmodels/controlnet-options";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function ModelMobileMenu({
  openControlnetOptions,
  promptStrength,
  setPromptStrength,
  referenceImage,
  setReferenceImage,
  setOpenControlnetOptions,
  numberOfImages,
  setNumberOfImages,
  numSteps,
  setNumSteps,
  cfgScale,
  setCfgScale,
  width,
  setWidth,
  height,
  setHeight,
  superResolution,
  setSuperResolution,
  privateCreation,
  setPrivateCreation,
  aspectRatio,
  setAspectRatio,
  scheduler,
  setScheduler,
  colorGrading,
  setColorGrading,
  negativePrompt,
  setNegativePrompt,
}: {
  openControlnetOptions: boolean;
  promptStrength: number;
  setPromptStrength: any;
  referenceImage: any;
  setReferenceImage: any;
  setOpenControlnetOptions: any;
  numberOfImages: number;
  setNumberOfImages: any;
  numSteps: number;
  setNumSteps: any;
  cfgScale: number;
  setCfgScale: any;
  width: number;
  setWidth: any;
  height: number;
  setHeight: any;
  superResolution: boolean;
  setSuperResolution: any;
  privateCreation: boolean;
  setPrivateCreation: any;
  aspectRatio: string;
  setAspectRatio: any;
  scheduler: string;
  setScheduler: any;
  colorGrading: string;
  setColorGrading: any;
  negativePrompt: string;
  setNegativePrompt: any;
}) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Settings />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader></SheetHeader>
          <div className="grid gap-4 py-4">
            <ControlnetOptions
              promptStrength={promptStrength}
              setPromptStrength={setPromptStrength}
              referenceImage={referenceImage}
              setReferenceImage={setReferenceImage}
              setOpenControlnetOptions={setOpenControlnetOptions}
            />
            <AdvancedOptions
              openControlnetOptions={openControlnetOptions}
              numberOfImages={numberOfImages}
              setNumberOfImages={setNumberOfImages}
              numSteps={numSteps}
              setNumSteps={setNumSteps}
              cfgScale={cfgScale}
              setCfgScale={setCfgScale}
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
              superResolution={superResolution}
              setSuperResolution={setSuperResolution}
              privateCreation={privateCreation}
              setPrivateCreation={setPrivateCreation}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              scheduler={scheduler}
              setScheduler={setScheduler}
              colorGrading={colorGrading}
              setColorGrading={setColorGrading}
              negativePrompt={negativePrompt}
              setNegativePrompt={setNegativePrompt}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

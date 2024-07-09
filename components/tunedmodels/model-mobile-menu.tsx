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
}: {
  openControlnetOptions: boolean;
  promptStrength: number;
  setPromptStrength: any;
  referenceImage: any;
  setReferenceImage: any;
  setOpenControlnetOptions: any;
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
            <AdvancedOptions openControlnetOptions={openControlnetOptions} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

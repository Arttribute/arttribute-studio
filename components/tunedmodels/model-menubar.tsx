import Image from "next/image";
import Link from "next/link";
import ModelMobileMenu from "./model-mobile-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { LogoSVG } from "@/components/logo";
import { tokensIcon } from "@/components/custom-icons";
export default function ModelMenubar({
  modelData,
  userData,
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
  modelData: any;
  userData: any;
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
      <div className=" fixed top-0 left-0 right-0 z-10 p-2  ">
        <Menubar className="border-none px-2 bg-transparent">
          <MenubarMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" passHref>
                    <Button variant="ghost" className="w-18 p-1 rounded-lg">
                      <LogoSVG />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back to Studio Home </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <MenubarTrigger className="p-1 border border-neutral-300 rounded-lg">
              <div className="overflow-hidden rounded">
                <Image
                  src={modelData?.display_image}
                  alt={modelData?.model_name}
                  width={34}
                  height={34}
                  className="aspect-[1]"
                />
              </div>

              <div className="block ml-2 mr-4">
                <div className="flex text-xs text-neutral-500">
                  Fine-tuned model
                </div>
                <div className="flex text-sm font-semibold truncate w-48 lg:w-full">
                  {modelData?.model_name}
                </div>
              </div>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>About this model</MenubarLabel>
              <MenubarSeparator />
              <MenubarItem>
                <Link
                  href="/tunedmodels/shadcn"
                  passHref
                  className="text-xs text-neutral-600"
                >
                  <b>Creator: </b> {modelData?.owner?.name}
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link
                  href="/tunedmodels/shadcn"
                  passHref
                  className="text-xs text-neutral-600"
                >
                  <b>Training data:</b> Ethereal Harmony
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link
                  href="/tunedmodels/shadcn"
                  passHref
                  className="text-xs text-neutral-600"
                >
                  <b>License: </b> {modelData?.license}
                </Link>
              </MenubarItem>
              <MenubarSeparator />

              <MenubarItem className="border mt-1">
                <Link href="/tunedmodels" passHref>
                  Explore other models
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <div className="grow" />
          <div className="lg:hidden">
            <ModelMobileMenu
              openControlnetOptions={openControlnetOptions}
              promptStrength={promptStrength}
              setPromptStrength={setPromptStrength}
              referenceImage={referenceImage}
              setReferenceImage={setReferenceImage}
              setOpenControlnetOptions={setOpenControlnetOptions}
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
          {userData !== null ? (
            <MenubarMenu>
              <MenubarTrigger className="hidden lg:flex p-1 border border-purple-600 rounded-full">
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={userData?.picture}
                    alt={userData?.name}
                    width={28}
                    height={28}
                    className="aspect-[1]"
                  />
                </div>
                <div className="block ml-2 mr-4">
                  <div className="flex">
                    <div className="mt-0.5 mr-2"> {tokensIcon}</div>
                    <div className="flex text-sm font-semibold">
                      {userData?.credits}
                    </div>
                  </div>
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarLabel>{userData?.name}</MenubarLabel>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/buy" passHref className="flex">
                    <div className="mr-2 m-0.5">{tokensIcon}</div> Get more
                    tokens
                  </Link>
                </MenubarItem>
                <MenubarSeparator />

                <MenubarItem className="border mt-1">
                  <Link href="/tunedmodels" passHref>
                    Disconnect
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          ) : null}
        </Menubar>
      </div>
    </>
  );
}

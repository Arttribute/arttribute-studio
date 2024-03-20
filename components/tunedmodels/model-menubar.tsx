import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ChevronLeft } from "lucide-react";
import { LogoSVG } from "@/components/logo";
import { tokensIcon } from "@/components/custom-icons";
import ConnectButton from "@/components/connect-button";
export default function ModelMenubar({
  modelData,
  userData,
}: {
  modelData: any;
  userData: any;
}) {
  return (
    <>
      <div className=" fixed top-0 left-0 right-0 z-10 p-2  ">
        <Menubar className="border-none px-2">
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
                <div className="flex text-sm font-semibold">
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
          <MenubarMenu>
            <MenubarTrigger className="flex p-1 border border-purple-600 rounded-full">
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
                  <div className="mr-2 m-0.5">{tokensIcon}</div> Get more tokens
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
        </Menubar>
      </div>
    </>
  );
}

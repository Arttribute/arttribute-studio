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

import { LogoSVG } from "@/components/logo";
import { tokensIcon } from "@/components/custom-icons";

export default function ModelMenubar() {
  return (
    <>
      <div className=" fixed top-0 left-0 right-0 z-10 p-2 bg-white border-b">
        <Menubar className="border-none px-2">
          <MenubarMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" passHref>
                    <Button variant="ghost">
                      <LogoSVG />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Studio Home </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <MenubarTrigger className="p-1 border rounded">
              <div className="overflow-hidden rounded">
                <Image
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
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
                  Lines that created
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
                  <b>Creator: </b> Ethereal Harmony
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
                  <b>License: </b> Ethereal Harmony
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
            <MenubarTrigger className="flex p-1 border rounded-full">
              <div className="overflow-hidden rounded-full">
                <Image
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  width={28}
                  height={28}
                  className="aspect-[1]"
                />
              </div>
              <div className="block ml-2 mr-4">
                <div className="flex">
                  <div className="mt-0.5 mr-2"> {tokensIcon}</div>
                  <div className="flex text-sm font-semibold">100000</div>
                </div>
              </div>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Ethereal Harmony</MenubarLabel>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/tunedmodels/shadcn" passHref>
                  Get more tokens
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

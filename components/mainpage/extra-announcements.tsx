import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Asterisk,
  ChevronRight,
  GalleryVertical,
  Sparkles,
} from "lucide-react";

export function ExtraAnnouncements() {
  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-100 rounded-lg">
          <div className="grid grid-cols-11 gap-4 p-4">
            <div className="col-span-5">
              <div className="m-2 py-20 px-10">
                <div className="font-bold text-5xl m-1">
                  <h1>Mint your AI Creations as NFTs</h1>
                </div>
                <div className="text-lg mt-2 m-1">
                  <p></p>
                </div>
                <div className="flex mt-4">
                  <Button className="m-1 font-bold p-6 rounded-lg px-12">
                    Start Minting
                    <GalleryVertical className="h-4 w-4  m-0.5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="m-1 font-bold p-6 rounded-lg opacity-90"
                  >
                    Enter marketplace
                    <ChevronRight className="h-4 w-4  m-0.5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="flex items-center justify-center p-8"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

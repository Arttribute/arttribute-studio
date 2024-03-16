import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export function Announcements() {
  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-amber-100 rounded-lg">
          <div className="grid grid-cols-11 gap-4 p-4">
            <div className="col-span-5">
              <div className="flex items-center justify-center p-4">
                <Image
                  src="/studiomodel.webp"
                  alt="Featured Model"
                  width={500}
                  height={400}
                  className="object-cover transition-all aspect-[4/3] rounded-lg"
                />
              </div>
            </div>
            <div className="col-span-5">
              <div className="m-2 py-14">
                <div className="font-bold text-5xl m-1">
                  <h1>Custom AI models Created by Artists</h1>
                </div>
                <div className="text-lg mt-2 m-1">
                  <p>
                    Use custom AI Art models created by artists to bring your
                    artistic vision to life with text to image
                  </p>
                </div>
                <div className="flex mt-4">
                  <Button className="m-1 font-bold p-6 rounded-lg px-12">
                    Create Art with AI <Sparkles className="m-1 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="m-1 font-bold p-6 rounded-lg opacity-90"
                  >
                    Create your own AI model
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

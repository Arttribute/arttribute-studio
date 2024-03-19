import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Announcements() {
  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-amber-100 rounded-lg">
          <div className="flex item-cemnter justify-center text-center">
            <div className="m-2 py-14">
              <div className="font-bold text-5xl m-1">
                <h1>Custom AI models Created by Artists</h1>
              </div>
              <div className="text-lg mt-2 m-1">
                <p>
                  Create art using custom AI art models, compete and host AI art
                  competitions
                </p>
              </div>
              <div className="flex mt-4 justify-center text-center">
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
    </>
  );
}

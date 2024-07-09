import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Announcements() {
  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-amber-100 rounded-lg">
          <div className="flex item-cemnter justify-center text-center">
            <div className="m-2 py-14">
              <div className="font-bold text-4xl lg:text-5xl m-1">
                <h1>Custom AI models Created by Artists</h1>
              </div>
              <div className="text-lg mt-2 m-1">
                <p>Create art using custom AI art models</p>
              </div>
              <div className="flex mt-4 justify-center text-center">
                <Button className="hidden lg:flex m-1 font-bold px-6 lg:p-6 rounded-lg lg:px-12">
                  Create Art with AI <Sparkles className="m-1 h-4 w-4" />
                </Button>
                <Link href="/tunedmodels/create">
                  <Button
                    variant="outline"
                    className="hidden lg:flex m-1 font-bold px-2 lg:p-6 rounded-lg opacity-90"
                  >
                    Create your own AI model
                  </Button>
                </Link>
                <Link href="/tunedmodels/create">
                  <Button className=" lg:hidden m-1 font-bold px-20 p-4 rounded-lg opacity-90">
                    Create Art with AI <Sparkles className="m-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

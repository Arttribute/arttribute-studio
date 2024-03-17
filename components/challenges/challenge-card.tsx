import {
  CircleIcon,
  PlusIcon,
  StarIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { TimerIcon } from "lucide-react";

export function ChallengeCard({ data }: any) {
  return (
    <Link href={`/challenges/123`}>
      <div className="col-span-1 rounded-lg border p-1.5">
        <div className="flex  ">
          <Image
            src={"/main.webp"}
            alt={"challengename"}
            width={100}
            height={100}
            className="rounded-lg aspect-[1]"
          />
          <div className="ml-4 mt-2 w-full overflow-hidden whitespace-nowrap text-ellipsis">
            <p className="text-base font-semibold">My challenge</p>
            <p className="text-sm text-muted-foreground ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="flex rounded-lg  items-center">
              <div className="flex py-0.5">
                <TimerIcon className="h-3.5 w-3.5 mr-1 text-indigo-500 " />
                <p className="text-xs text-indigo-700"> 1hr left</p>
              </div>
            </div>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import {
  CircleIcon,
  PlusIcon,
  StarIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { TimerIcon } from "lucide-react";

export function ChallengeCard({ challenge }: any) {
  const remainingTime = challenge.end_date - Date.now();
  //const easyTimeDisplay = new Date(remainingTime).toISOString().substr(11, 8);
  return (
    <Link href={`/challenges/${challenge.slug}`}>
      <div className="col-span-1 rounded-lg border p-1.5">
        <div className="flex  ">
          <Image
            src={challenge.thumbnail}
            alt={challenge.challenge_name}
            width={100}
            height={100}
            className="object-cover transition-all rounded-lg aspect-[1]"
          />
          <div className="ml-4 mt-2 w-full overflow-hidden whitespace-nowrap text-ellipsis">
            <p className="text-base font-semibold">
              {challenge.challenge_name}
            </p>
            <p className="text-sm text-muted-foreground ">
              {challenge.description}
            </p>

            <div className="flex rounded-lg  items-center">
              <div className="flex py-0.5">
                <TimerIcon className="h-3.5 w-3.5 mr-1 text-indigo-500 " />
                <p className="text-xs text-indigo-700">
                  {" "}
                  {challenge.end_date} left
                </p>
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

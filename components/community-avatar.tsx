import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import { useState, useEffect } from "react";

interface User {
  _id: string;
  picture: string;
  name: string;
}
export function CommunityAvatar(user_id: any) {
  console.log(user_id.user_id);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/user/${user_id.user_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center justify-center rounded-full bg-red-50 w-10 h-10 border border-green-600 border-2">
            {user && (
              <Image
                src={user.picture}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full w-9 h-9 contain"
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            <div className="flex items-end">
              <div className="flex mr-3 items-center justify-center rounded-full bg-red-50 w-10 h-10 border border-green-600 border-2">
                {user && (
                  <Image
                    className="rounded-full w-9 h-9 contain"
                    src={user.picture}
                    alt={user.name}
                    width={120}
                    height={120}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-base">{user?.name}</h3>
                <p className="text-sm">
                  <span className="font-semibold">Promts: </span>
                  --
                </p>
              </div>
            </div>

            <hr className="my-3" />
            <div className="pb-4 px-1">
              <a href="#" className="underline">
                See creations
              </a>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    fetch("http://localhost:3000/api/users/" + user_id.user_id)
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
            <img
              className="rounded-full w-9 h-9 contain"
              src={user?.picture}
              alt={user?.name}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            <div className="flex items-end">
              <div className="flex mr-3 items-center justify-center rounded-full bg-red-50 w-10 h-10 border border-green-600 border-2">
                <img
                  className="rounded-full w-9 h-9 contain"
                  src={user?.picture}
                  alt={user?.name}
                />
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

"use client";

import { Button } from "@/components/ui/button";
import { Plus, Check, Loader } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getLoggedUser } from "@/lib/utils";
import { User } from "@/models/User";
import { useState, useEffect } from "react";

interface Props {
  uid: string;
}

const FollowButton = ({ uid }: Props) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [doesUserFollow, setDoesUserFollow] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const user = getLoggedUser();
    setLoggedUser(user);

    if (loggedUser) {
      const isUserFollowing = loggedUser?.following?.some(
        (user: User) => user._id === uid
      );
      setDoesUserFollow(isUserFollowing);
    }
  }, []);

  const handleChangeFollow = async (action: "follow" | "unfollow") => {
    setDisabled(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${loggedUser?.web3Address}/follows`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          action: action,
        }),
      }
    );
    const data = await res.json();
    setDisabled(false);
    localStorage.setItem("user", JSON.stringify(data));
    setLoggedUser(data);
  };

  return (
    loggedUser &&
    loggedUser._id !== uid && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="rounded-full w-8 h-8 absolute bottom-0 right-0"
              disabled={disabled}
              onClick={() => {
                handleChangeFollow(doesUserFollow ? "unfollow" : "follow");
                setDoesUserFollow(!doesUserFollow);
              }}
            >
              {disabled ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : doesUserFollow ? (
                <Check className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{doesUserFollow ? "Unfollow" : "Follow"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  );
};

export default FollowButton;

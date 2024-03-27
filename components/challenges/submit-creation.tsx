"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TimerIcon } from "lucide-react";
import { User } from "@/models/User";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader } from "lucide-react";

import axios from "axios";
export function SubmitCreation({ data }: any) {
  const [title, setTitle] = useState("");
  const [challengeCode, setChallengeCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
  }, [account]);

  const { push } = useRouter();

  async function submitCreation() {
    try {
      setLoading(true);
      const submissionData = {
        title: title,
        challenge_code: challengeCode,
        owner: data.owner,
        image_url: data.image_url,
        prompt_id: data.prompt_id,
        tunedmodel_id: data.tunedmodel_id,
      };
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/submissions`,
        submissionData
      );

      push(`/challenges/${result.data.challenge.slug}`);
    } catch (error) {
      console.error(error);
      setError("There was an error submitting your creation");
    }
  }
  return (
    <div className="grid w-full gap-2 ">
      {account?._id === data.owner_id && (
        <Dialog>
          <DialogTrigger>
            <Button className="w-full gap-2 ">Submit Creation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit your creation</DialogTitle>
              <DialogDescription>
                Submit your creation to a challenge
              </DialogDescription>
            </DialogHeader>
            <div className="m-1">
              <p className="text-sm font-semibold mb-1">Creation Title</p>
              <Input
                placeholder="Title your creation"
                className="mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="text-sm font-semibold ">Chellenge code</p>
              <p className="text-xs text-muted-foreground mb-1.5">
                Get the chellenge code from the chellenge page then enter it
                here
              </p>
              <Input
                placeholder="Enter the chalenge code"
                autoFocus
                className="mb-4"
                value={challengeCode}
                onChange={(e) => setChallengeCode(e.target.value)}
              />

              {loading ? (
                <Button className=" w-full" onClick={submitCreation}>
                  Submiting <Loader className="h-5 w-5 animate-spin" />
                </Button>
              ) : (
                <Button className="w-full" onClick={submitCreation}>
                  Submit
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

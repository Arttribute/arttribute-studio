"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TimerIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader } from "lucide-react";

import axios from "axios";
export function AnnounceWinner({ challenge, submissions }: any) {
  const [title, setTitle] = useState("");
  const [winners, setWinners] = useState<Array<string>>([]);
  const [error, setError] = useState("");

  async function announceWinner() {
    //update is_winner to true for each winning submission in the database
    try {
      const challengeResult = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenges/${challenge.slug}`,
        { _id: challenge._id, winners: winners, closed: true }
      );

      //submissionstoUpdate = [{sumbissionId: "123", is_winner: true}, {sumbissionId: "123", is_winner: true}]
      const submissiontoUpdate = winners.map((winner) => {
        return { _id: winner, is_winner: true };
      });

      const submissionResult = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/submissions`,
        { submissions: submissiontoUpdate }
      );
      console.log(challengeResult);
      console.log(submissionResult);
    } catch (error) {
      console.error(error);
      setError("There was an error announcing the winners");
    }
  }

  return (
    <div className="grid ">
      <Dialog>
        <DialogTrigger>
          <Button className=" gap-2 ">Select and announce winners</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Announce winners</DialogTitle>
            <DialogDescription>
              Select and announce winners for the challenge
            </DialogDescription>
          </DialogHeader>
          <div className="m-1">
            <div className="">
              <div className="grid grid-cols-12 ">
                <div className="col-span-1 p-1 py-2">
                  <p></p>
                </div>
                <div className="col-span-4 p-1 py-2">
                  <p className="ml-4 text-xs text-muted-foreground">Title</p>
                </div>
                <div className="col-span-3 p-1 py-2">
                  <p className="text-xs text-muted-foreground">Owner</p>
                </div>
                <div className="col-span-2 p-1 py-2">
                  <p className="text-xs text-muted-foreground">Votes</p>
                </div>
                <div className="col-span-2 p-1 py-2">
                  <p className="text-xs text-muted-foreground"> isWinner</p>
                </div>
              </div>

              {submissions.map((submission: any) => (
                <div
                  key={submission._id}
                  className="grid grid-cols-12 border-t mb-1"
                >
                  <div className="col-span-1">
                    <Image
                      src={submission.image_url}
                      alt={submission.title}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover transition-all aspect-[1] m-1"
                    />
                  </div>
                  <div className="col-span-4 p-1 py-3">
                    <p className="ml-4 text-sm tracking-tight">
                      {submission.title}
                    </p>
                  </div>
                  <div className="col-span-3 p-1 py-3">
                    <p className="ml-4 text-sm tracking-tight">
                      {submission.owner.name}
                    </p>
                  </div>
                  <div className="col-span-2 p-1 py-3">
                    <p className="ml-4 text-sm tracking-tight">
                      {submission.votes}
                    </p>
                  </div>

                  <div className="col-span-2 p-1 py-3">
                    <Checkbox
                      checked={winners.includes(submission._id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setWinners([...winners, submission._id]);
                        } else {
                          setWinners(
                            winners.filter(
                              (winner) => winner !== submission._id
                            )
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={announceWinner} className="w-full">
            Announce winners
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

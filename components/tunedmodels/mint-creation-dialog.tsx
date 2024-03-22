"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { BoxIcon, Loader } from "lucide-react";

import axios from "axios";
import { set } from "mongoose";
export function MintCreationDialog() {
  const [title, setTitle] = useState("");
  const [challengeCode, setChallengeCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { push } = useRouter();

  async function mintCreation() {
    try {
      setLoading(true);
      //mint creation
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("There was an error submitting your creation");
    }
  }

  return (
    <div className="w-full ">
      <Dialog>
        <DialogTrigger className="w-full ">
          <Button
            variant="ghost"
            className="w-full text-white border rounded-lg"
          >
            <BoxIcon className="mr-1" />
            Mint{" "}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mint Creations</DialogTitle>
            <DialogDescription>
              Mint your creation to the blockchain
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

            {loading ? (
              <Button className=" w-full" onClick={mintCreation}>
                Minting <Loader className="h-5 w-5 animate-spin" />
              </Button>
            ) : (
              <Button className="w-full" onClick={mintCreation}>
                Mint Creation
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

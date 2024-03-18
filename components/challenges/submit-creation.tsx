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

export function SubmitCreation({ data }: any) {
  return (
    <div className="grid w-full gap-2 ">
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
            <Input placeholder="Title your creation" className="mb-4" />
            <p className="text-sm font-semibold ">Chellenge code</p>
            <p className="text-xs text-muted-foreground mb-1.5">
              Get the chellenge code from the chellenge page then enter it here
            </p>
            <Input
              placeholder="Enter the chalenge code"
              autoFocus
              className="mb-4"
            />

            <Button className="w-full ">Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

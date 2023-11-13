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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
export function TunedModelCard() {
  return (
    <Card>
      <Link href={`/tunedmodels/${12345}`}>
        <CardHeader className="grid grid-cols-3 items-start gap-4 space-y-0 -m-2">
          <div className="hidden lg:flex items-center space-x-1 rounded-md ">
            <div className="overflow-hidden rounded-md">
              <Image
                src={
                  "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60"
                }
                alt={"Model Name"}
                width={120}
                height={120}
                className="aspect-[1]"
              />
            </div>
          </div>
          <div className="space-y-1 col-span-3 lg:col-span-2">
            <CardTitle>Model Name</CardTitle>
            <CardDescription>
              Beautifully designed components built with Radix UI and Tailwind
              CSS.
            </CardDescription>
          </div>
        </CardHeader>
      </Link>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            Model-ready
          </div>
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            20k
          </div>

          <Dialog>
            <DialogTrigger>
              <div className="flex items-center">
                <Pencil1Icon className="mr-1 h-3 w-3" />
                Edit Details
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Model Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2"></div>
              </div>
              <DialogFooter>
                <Button>Save model Details</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

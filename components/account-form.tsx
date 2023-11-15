"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "./ui/dialog";
import Image from "next/image";
import { defaultProfile } from "@/data/defaults";
import { toast } from "./ui/use-toast";
import { Web3Storage } from "web3.storage";
import { useState } from "react";
import { User } from "@/models/User";

interface Props {
  web3Address: string;
  name: string;
  email: string;
  picture: any;
  setAccount: React.Dispatch<React.SetStateAction<User | null>>;
}

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

const InputForm = ({
  web3Address,
  name,
  email,
  picture,
  setAccount,
}: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const storageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
  const storage = new Web3Storage({ token: storageToken });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      email,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setDisabled(true);

    try {
      let fileUrl = null;
      if (file) {
        const storedFile = await storage.put([file]);
        fileUrl = `https://${storedFile.toString()}.ipfs.w3s.link/${file.name}`;
      }

      const res = await fetch(`/api/users/${web3Address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, fileUrl }),
      });

      if (!res.ok) {
        console.error("Failed to update user");
      } else {
        //   toast({
        //     title: "Success",
        //     description: "Successfully updated user",
        //   });

        const resData = await res.json();

        localStorage.setItem("user", JSON.stringify(resData));
        setDisabled(false);
        setAccount(resData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <div className="flex justify-center items-center space-x-3">
          <div className="w-[100px] h-[100px] relative rounded-md overflow-hidden aspect-w-1 aspect-h-1">
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src={picture || defaultProfile}
                alt="profile"
                objectFit="cover"
                layout="fill"
              />
            </div>
          </div>

          <FormItem>
            <FormLabel>Picture</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={disabled}>
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default InputForm;

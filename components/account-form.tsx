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
  picture: z.any(),
});

const InputForm = ({
  web3Address,
  name,
  email,
  picture,
  setAccount,
}: Props) => {
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      email,
      picture: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setDisabled(true);
    const res = await fetch(`http://localhost:3000/api/users/${web3Address}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  }

  // TODO: fix image upload

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
          <Image
            src={picture || defaultProfile}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

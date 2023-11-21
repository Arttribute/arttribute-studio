"use client";
import { Metadata } from "next";
import { useState, useEffect } from "react";
import axios from "axios";

import { Menu } from "@/components/menu";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { User } from "@/models/User";

import { squircle } from "ldrs";
squircle.register();

import { lineWobble } from "ldrs";
lineWobble.register();

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Prompt must be at least 3 characters.",
  }),
  prompt: z.string().min(2, {
    message: "Prompt must be at least 3 characters.",
  }),
  negative_prompt: z.string(),
});

export default function TunedModelPage() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
  }, []);

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="lg:p-16 lg:pt-8 m-5">Buy</div>
          </div>
        </div>
      </div>
    </>
  );
}

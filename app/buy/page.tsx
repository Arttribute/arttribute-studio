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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
            <div className="lg:p-16 lg:pt-8 m-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:col-span-1 p-10 lg:px-24">
                  <Card className="p-8">
                    <CardHeader className="">
                      <CardTitle className="text-center">
                        {" "}
                        <h2 className="text-8xl text-indigo-800">5$</h2>
                        <h2 className="text-indigo-800">for 100 credits</h2>
                      </CardTitle>
                    </CardHeader>
                    <CardDescription>
                      <div className="flex items-center justify-center">
                        <div>
                          <p className="text-lg mb-2">
                            5 credits per AI image generation
                          </p>
                          <p className="text-lg mb-2">
                            55 credits per tuned model creation
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <Button className="mt-4 px-32">Buy Now</Button>
                      </div>
                    </CardDescription>
                  </Card>
                </div>
                <div className="lg:col-span-1 p-12">
                  <h3 className="text-4xl font-semibold tracking-tight mb-2">
                    More plans coming soon!
                  </h3>
                  <p className="text-2xl text-muted-foreground mb-3">
                    We are working hard to bring you more plans and features.
                    Stay tuned!
                  </p>

                  <p className="text-md text-muted-foreground">
                    If you wish to get a custom plan, or have any questions,
                    please contact us at{" "}
                    <a
                      href="mailto:arttributedev@gmail.com
"
                      className="text-primary"
                    >
                      arttributedev@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

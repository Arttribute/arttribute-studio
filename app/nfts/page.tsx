"use client";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Info } from "lucide-react";

import axios from "axios";

import PromptGalleryGrid from "@/components/prompt-gallery-grid";

export default function CreationsPage() {
  const [challenge, setChallenge] = useState<any>(null);
  const [prompts, setPrompts] = useState<Array<any>>([]);
  const [myprompts, setMyPrompts] = useState<Array<any>>([]);
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [loadedAccount, setLoadedAccount] = useState(false);
  const [currentAccountisOwner, setCurrentAccountisOwner] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    getAllPrompts();
    if (!loaded && user) {
      getMyPrompts(user._id);
    }
  }, [prompts, myprompts]);

  async function getAllPrompts() {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts`
      );
      setPrompts(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMyPrompts(userId: string) {
    const res = await axios.get("/api/prompts/users", {
      params: { userId: userId },
    });
    const data = res.data;
    console.log(data);
    setMyPrompts(data);
    setLoaded(true);
  }

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="grid lg:grid-cols-5 mt-14">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-4 lg:col-span-4 ">
            <div className="bg-background ">
              <div className="h-full px-4 py-6 lg:px-8">Coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { Metadata } from "next";

import { Menu } from "@/components/menu";
import { Sidebar } from "../components/sidebar";

import { Announcements } from "@/components/mainpage/announcements";
import { FeaturedModels } from "@/components/mainpage/featured-models";
import { RecentCreations } from "@/components/mainpage/recent-creations";
import { ExtraAnnouncements } from "@/components/mainpage/extra-announcements";

async function getPrompts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data;
}

async function getTunedModels() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tunedmodels`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

async function getCollections() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function CreationsPage() {
  const prompts: any = await getPrompts();
  const tunedmodels = await getTunedModels();
  const collections = await getCollections();

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="grid lg:grid-cols-5 mt-14">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-4 lg:col-span-4 ">
            <div className="bg-background">
              <div className="">
                <div className="">
                  <div className="h-full px-4 py-6 lg:px-8">
                    <div className="mb-8">
                      <Announcements />
                    </div>
                    <div className="mb-8">
                      <FeaturedModels models={tunedmodels} />
                    </div>

                    <div className="mb-8">
                      <RecentCreations creations={prompts} />
                    </div>

                    <div className="mb-8">{/*<ExtraAnnouncements />*/}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

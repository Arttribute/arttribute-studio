import TunedModel, { TunedModel as TM } from "@/models/TunedModel";
import { InfoCard } from "./info-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommunityCard {
  data: {
    name: string;
    description: string;
    members: any[];
    models: TM[];
    display_image: string;
    slug: string;
    createdAt: string;
  };
}

import Image from "next/image";

export function CommunityCard({ data }: CommunityCard) {
  console.log(data);
  return (
    <a
      href={"/communities/" + data.slug}
      className="relative flex h-64 flex-col items-center md:basis-96 min-w-[400px] md:max-w-[70%] grow bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Image
        className="object-cover w-full rounded-t-lg h-96 h-full md:w-48 md:rounded-none md:rounded-s-lg"
        src={data.display_image}
        alt=""
      />
      <div className="bg-white hover:bg-opacity-[50%] bg-opacity-[20%] hover:backdrop-blur-sm ease-in duration-100 backdrop-blur-xs absolute bottom-0 w-full h-auto md:w-48 text-center py-1">
        <p className="flex gap-x-1 text-sm duration-200 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="8" cy="8" r="3.8" />
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="17" cy="9" r="3.4" />
          </svg>
          {data.members.length}{" "}
          {data.members.length == 1 ? " member" : " members"}
        </p>
      </div>
      <div className="flex flex-col justify-between p-3 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.name}
        </h5>
        <p className="mb-3 text-ellipsis text-sm font-normal text-gray-700 dark:text-gray-400">
          {data.description}
        </p>

        <div className="text-sm">
          <p>
            <span className="font-semibold">Created</span>{" "}
            <span className="bg-slate-100 py-1 px-2 border-solid border-3 border-slate-900 rounded-full">
              {new Intl.DateTimeFormat("en-UK", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(data.createdAt))}
            </span>
          </p>
          <hr className="my-4" />
          <div>
            <span className="font-semibold block">
              Models: ({data.models.length})
            </span>{" "}
            <div className="mt-2 bg-green-50 py-1 px-2 gap-3 flex border-solid border-green-900 rounded-full">
              {data.models.map((model) => (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center justify-center rounded-full bg-red-50 w-10 h-10 border border-green-600 border-2">
                        <Image
                          className="rounded-full w-9 h-9 contain"
                          src={model.display_image}
                          alt={model.model_name}
                          width={120}
                          height={120}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <div className="flex items-end">
                          <div className="flex mr-3 items-center justify-center rounded-full bg-red-50 w-10 h-10 border border-green-600 border-2">
                            <Image
                              className="rounded-full w-9 h-9 contain"
                              src={model.display_image}
                              alt={model.model_name}
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-semibold text-base">
                              {model.model_name}
                            </h3>
                            <p className="text-sm">
                              <span className="font-semibold">Author: </span>
                              {String(model.owner)}
                            </p>
                          </div>
                        </div>

                        <hr className="my-3" />
                        <div className="pb-4 px-1">{model.description}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

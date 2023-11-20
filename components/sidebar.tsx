"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // Fetch Communities from DB
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4 fixed top-8 left-0 overflow-y-auto w-1/5 mt-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Link href="/" passHref>
              <Button
                variant={pathname === "/" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="12" cy="12" r="11" />
                  <path d="M7 10C7 8.34314 8.34315 7 10 7C11.1046 7 12 7.89543 12 9C12 7.89543 12.8954 7 14 7C15.6569 7 17 8.34314 17 10C17 12.5 12 16 12 16C12 16 7 12.5 7 10z" />
                </svg>
                Creations
              </Button>
            </Link>
            <Link href="/artists" passHref>
              <Button
                variant={pathname === "/artists" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Artists
              </Button>
            </Link>
            <Link href="/communities" passHref>
              <Button
                variant={pathname === "/communities" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {/* svg icon representing a bot*/}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="8" cy="8" r="3.8" />
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="17" cy="9" r="3.4" />
                </svg>
                Communities
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Create
          </h2>
          <div className="space-y-1">
            <Link href="/collections" passHref>
              <Button
                variant={pathname === "/collections" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                Collections
              </Button>
            </Link>
            <Link href="/tunedmodels" passHref>
              <Button
                variant={pathname === "/tunedmodels" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <line x1="0" y1="5" x2="4" y2="5" />
                  <circle cx="7" cy="5" r="3" />
                  <line x1="10" y1="5" x2="20" y2="5" />

                  <line x1="0" y1="12.5" x2="10" y2="12.5" />
                  <circle cx="13" cy="12.5" r="3" />
                  <line x1="17" y1="12.5" x2="20" y2="12.5" />

                  <line x1="0" y1="20" x2="4" y2="20" />
                  <circle cx="7" cy="20" r="3" />
                  <line x1="10" y1="20" x2="20" y2="20" />
                </svg>
                Tuned Models
              </Button>
            </Link>
            <Link href="/imaginarium" passHref>
              <Button
                variant={pathname === "/imaginaruim" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <line x1="12" y1="2" x2="12" y2="8" />
                  <line x1="12" y1="16" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="8" y2="12" />
                  <line x1="16" y1="12" x2="22" y2="12" />

                  <line x1="5" y1="5" x2="7" y2="7" />
                  <line x1="5" y1="19" x2="7" y2="17" />
                  <line x1="19" y1="5" x2="17" y2="7" />
                  <line x1="19" y1="19" x2="17" y2="17" />
                </svg>
                Imaginarium
              </Button>
            </Link>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Community
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="8" cy="8" r="3.8" />
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="17" cy="9" r="3.4" />
                  </svg>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

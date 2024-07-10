"use client";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import ConnectButton from "./connect-button";
import { User } from "@/models/User";
import { Logo } from "@/components/logo";
import { MobileMenu } from "./mobile-menu";
import { tokensIcon } from "./custom-icons";
import { UserIcon } from "lucide-react";
import { useMinipay } from "./providers/MinipayProvider";
import MinipayButton from "./minipay-button";

export function Menu() {
  const [account, setAccount] = useState<User | null>(null);
  const { minipay } = useMinipay();

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-10 p-2 bg-white border-b">
      <Menubar className="rounded-none border-none px-2 lg:px-4">
        <MenubarMenu>
          <div className=" lg:hidden">
            <MobileMenu />
          </div>
          <MenubarTrigger className="px-1">
            <Logo text="Arttribute Studio" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              {" "}
              <Link href="/" passHref>
                Studio Home
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Link href="/" passHref>
                {" "}
                About Arttribute
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <div className="grow" />
        {account ? (
          <>
            <MenubarMenu>
              <MenubarTrigger className="flex p-1 border border-purple-600 rounded-full ">
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={account?.picture}
                    alt={account?.name}
                    width={28}
                    height={28}
                    className="aspect-[1]"
                  />
                </div>
                <div className="block ml-2 mr-4 overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex">
                    <div className="flex text-sm font-semibold">
                      {account?.name}
                    </div>
                  </div>
                </div>
              </MenubarTrigger>
              <MenubarContent forceMount>
                <MenubarLabel inset>
                  <Link href="/profile" passHref>
                    {account.name}
                  </Link>
                </MenubarLabel>
                <MenubarSeparator />
                <MenubarItem inset>
                  <Link href="/profile" passHref>
                    <p>View Profile</p>
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  <Link href="/buy" passHref className="flex">
                    <div className="mt-0.5 mr-2"> {tokensIcon}</div>

                    {account.credits}
                    <div className="ml-2">
                      {" "}
                      <Link href="/buy" passHref className="font-semibold">
                        Get more
                      </Link>
                    </div>
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  {minipay ? (
                    <div className="w-full">
                      <MinipayButton balance={minipay.balance} />
                    </div>
                  ) : (
                    <div className="w-full">
                      <ConnectButton
                        action="Disconnect"
                        setAccount={setAccount}
                      />
                    </div>
                  )}
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </>
        ) : (
          <ConnectButton
            action="Connect account"
            setAccount={setAccount}
            buttonVariant="outline"
          />
        )}
      </Menubar>
    </div>
  );
}

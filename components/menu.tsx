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

import Link from "next/link";
import { useEffect, useState } from "react";
import ConnectButton from "./connect-button";
import AccountDialog from "./account-dialog";
import { User } from "@/models/User";
import { Logo } from "@/components/logo";
import { MobileMenu } from "./mobile-menu";
import { tokensIcon } from "./custom-icons";

export function Menu() {
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-10 p-2 bg-white">
      <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
        <MenubarMenu>
          <div className=" lg:hidden">
            <MobileMenu />
          </div>
          <MenubarTrigger>
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
        {account ? (
          <>
            <MenubarMenu>
              <MenubarTrigger className="hidden md:block">
                Account
              </MenubarTrigger>
              <MenubarContent forceMount>
                <MenubarLabel inset>Account</MenubarLabel>
                <MenubarSeparator />
                <MenubarRadioGroup value={account.name}>
                  <MenubarRadioItem value={account.name}>
                    {account.name}
                  </MenubarRadioItem>
                </MenubarRadioGroup>
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
                <AccountDialog user={account} setAccount={setAccount} />
              </MenubarContent>
            </MenubarMenu>
            <ConnectButton action="Disconnect" setAccount={setAccount} />
          </>
        ) : (
          <ConnectButton action="Connect" setAccount={setAccount} />
        )}
      </Menubar>
    </div>
  );
}

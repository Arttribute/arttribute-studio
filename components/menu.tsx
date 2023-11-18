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
                <MenubarLabel inset>Switch Account</MenubarLabel>
                <MenubarSeparator />
                <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Add Account...</MenubarItem>
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

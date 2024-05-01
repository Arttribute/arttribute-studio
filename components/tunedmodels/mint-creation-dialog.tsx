"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TimerIcon } from "lucide-react";
import { getChainId, getNetworkUrl } from "@/lib/networks";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { BoxIcon, Loader } from "lucide-react";

import { ethers } from "ethers";
import { BaseSepoliaContracts, AlfajoresContracts } from "@/lib/contracts";
import { AIArtNFT } from "@/lib/abi/AIArtNFT";
import { Magic } from "magic-sdk";

import Web3Modal from "web3modal";
import { connect } from "http2";

export function MintCreationDialog({ data }: any) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { push } = useRouter();

  async function mintCreation() {
    try {
      setLoading(true);
      handleMint();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("There was an error submitting your creation");
    }
  }

  async function handleMint() {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    const magic = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
      {
        network: {
          rpcUrl: "https://sepolia.base.org",
        },
      }
    );

    let rpcProvider = magic.rpcProvider;

    if (user.thirdpartyWallet) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      rpcProvider = connection;
    }

    const provider = new ethers.BrowserProvider(rpcProvider);
    const signer = await provider.getSigner();
    let contract = new ethers.Contract(
      AlfajoresContracts.AIArtNFT,
      AIArtNFT,
      signer
    );

    const address = await signer.getAddress();

    await contract.mintAIArt(1, address, data.image_url);
  }

  return (
    <div className="w-full ">
      <Dialog>
        <DialogTrigger className="w-full ">
          <Button
            variant="ghost"
            className="w-full text-white border rounded-lg"
          >
            <BoxIcon className="mr-1" />
            Mint{" "}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mint Creations</DialogTitle>
            <DialogDescription>
              Mint your creation to the blockchain
            </DialogDescription>
          </DialogHeader>
          <div className="m-1">
            <p className="text-sm font-semibold mb-1">Creation Title</p>
            <Input
              placeholder="Title your creation"
              className="mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {loading ? (
              <Button disabled className=" w-full">
                Minting <Loader className="h-5 w-5 animate-spin" />
              </Button>
            ) : (
              <Button className="w-full" onClick={mintCreation}>
                Mint Creation
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

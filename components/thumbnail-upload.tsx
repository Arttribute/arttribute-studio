"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

import { Loader, ImagePlusIcon } from "lucide-react";
import { ImageUpIcon } from "./custom-icons";
import { ImageDown } from "lucide-react";

export function ThumbnailUpload({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: any;
}) {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  //using useEffect to check for files and upload them

  const handleUpload = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "studio-upload");
    setLoading(true);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/arttribute/upload",
      data
    );
    const file = res.data;
    setImageUrl(file.secure_url);
    setLoading(false);
  };

  const handleDeleteImage = () => {
    setImageUrl("");
  };

  return (
    <>
      <div className=" rounded-md ">
        <input
          type="file"
          name="file"
          id="file"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageUrl}
            width={100}
            height={100}
            className="object-cover transition-all aspect-[1/1] rounded  hover:scale-105"
            onClick={() => handleDeleteImage()}
          />
        )}

        <div className="">
          {loading ? (
            <div
              style={{ width: 100, height: 100 }}
              className="rounded-lg border border-slate-400 hover:bg-gray-50"
            >
              <div className="flex items-center justify-center h-full">
                <Loader className="h-6 w-6 animate-spin" />
              </div>
            </div>
          ) : imageUrl === "" ? (
            <div
              style={{ width: 100, height: 100 }}
              className="rounded-lg border border-slate-400 hover:bg-gray-50"
            >
              <label htmlFor="file" className="cursor-pointer ">
                <div className="flex items-center justify-center h-full">
                  <ImagePlusIcon className="h-6 w-6 text-sm font-medium text-slate-500" />
                </div>
              </label>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

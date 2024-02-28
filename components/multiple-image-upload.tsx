"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { Loader } from "lucide-react";
import { ImageUpIcon } from "./custom-icons";
import { ImageDown } from "lucide-react";
import { ImagePlusIcon } from "lucide-react";
import { XCircle } from "lucide-react";

export default function MultipleImageUpload({
  imageUrls,
  setImageUrls,
}: {
  imageUrls: Array<string>;
  setImageUrls: any;
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
    setImageUrls([...imageUrls, file.secure_url]);
    setLoading(false);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = imageUrls.filter((image, i) => i !== index);
    setImageUrls(newImages);
  };

  return (
    <>
      <div className=" rounded-md p-2 ">
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          onChange={handleUpload}
        />
        {imageUrls && imageUrls.length > 0 ? (
          <div className="grid grid-cols-4 lg:grid lg:grid-cols-8 m-4 ">
            {imageUrls.map((image: any, index: number) => {
              return (
                <div key={index} className="m-1 col-span-1">
                  <Image
                    src={image}
                    alt={`image-${index}`}
                    width={150}
                    height={150}
                    className="object-cover transition-all aspect-[1/1] rounded  hover:scale-105"
                    onClick={() => handleDeleteImage(index)}
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className=" animate-spin">
                <Loader className="h-6 w-6" />
              </div>
            </div>
          ) : imageUrls && imageUrls.length > 0 ? (
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="file"
                className="cursor-pointer flex flex-col items-center justify-center px-4 py-2 w-72 rounded-lg border hover:bg-gray-50"
              >
                <ImagePlusIcon />
                <p className="text-sm font-bold">Upload more images</p>
              </label>
            </div>
          ) : (
            <div className="rounded-lg border flex flex-col items-center justify-center hover:bg-gray-50">
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center px-4 py-2 w-72 rounded-lg">
                  <div>{ImageUpIcon}</div>
                  <p className="text-sm font-bold">Upload images</p>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

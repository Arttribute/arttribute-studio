import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

import { ImageIcon, Loader2 } from "lucide-react";

export default function SingleImageUpload({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: any;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "studio-upload");

    setLoading(true);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/arttribute/upload",
      data
    );
    const uploadedFile = res.data;
    setImageUrl(uploadedFile.secure_url); // Set the uploaded image URL
    setLoading(false);
  };

  return (
    <>
      <div className="rounded-md p-2">
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          onChange={handleUpload}
        />
        {imageUrl ? (
          <div className="flex justify-center mb-2 w-full">
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              width={150}
              height={150}
              className="object-cover transition-all aspect-[1/1] rounded-lg hover:scale-105"
            />
          </div>
        ) : (
          <label htmlFor="file" className="cursor-pointer w-full">
            <div className="flex justify-center mb-2 w-full p-12 border rounded-lg text-slate-500">
              {loading ? (
                <div className="animate-spin">
                  <Loader2 className="h-6 w-6" />
                </div>
              ) : (
                <ImageIcon className="h-6 w-6" />
              )}
            </div>
          </label>
        )}

        <div className="flex flex-col items-center justify-center w-full">
          {loading ? (
            <div className="rounded-lg border border-slate-600 flex flex-col items-center justify-center w-full hover:bg-gray-50">
              <div className="px-4 py-2 rounded-lg">
                <p className="text-sm font-medium text-slate-800">
                  Uploading image...
                </p>
              </div>
            </div>
          ) : (
            <label htmlFor="file" className="cursor-pointer w-full">
              <div className="rounded-lg border border-slate-600 flex flex-col items-center justify-center hover:bg-gray-50">
                <div className="px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-slate-800">
                    {imageUrl ? "Change image" : "Upload image"}
                  </p>
                </div>
              </div>
            </label>
          )}
        </div>
      </div>
    </>
  );
}

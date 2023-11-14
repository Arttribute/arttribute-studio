"use client";
import { Metadata } from "next";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { Web3Storage } from "web3.storage";
import Replicate from "replicate";
import axios from "axios";
import ky from "ky";

import { Menu } from "../../../components/menu";
import { Sidebar } from "../../../components/sidebar";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { playlists } from "../../../data/playlists";

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt must be at least 3 characters.",
  }),
  negative_prompt: z.string(),
});

type FineTuneResponse = {
  id: string;
  status: string;
  message: string;
  data: string;
};

type ModelListResponse = {
  status: string;
  message: string;
  data: [
    {
      created_at: string;
      updated_at: string;
      id: string;
      orig_images: string;
      title: string;
    }
  ];
};

type DreamboothResponse = {
  status: string;
  id: string;
  output: Array<string>;
};

export default function MusicPage() {
  const [images, setImages] = useState<Array<File>>([]);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [generatedImages, setGeneratedImages] = useState<Array<string>>([]);
  const [generationId, setGenerationId] = useState("");
  const [tunedModelId, setTunedModelId] = useState("864640");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [listOfModels, setListOfModels] = useState<Array<any>>([]);
  const [instancePrompt, setInstancePrompt] = useState("");
  const [classPrompt, setClassPrompt] = useState("");
  const [seed, setSeed] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [showNegativePrompt, setShowNegativePrompt] = useState(false);

  // Function to toggle the visibility
  const toggleNegativePrompt = () => setShowNegativePrompt(!showNegativePrompt);

  const storageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
  const storage = new Web3Storage({ token: storageToken });

  useEffect(() => {
    //if image generation function has been called and generated images is empty, call fetchDreamboothData\
    if (generationId && generatedImages && generatedImages.length == 0) {
      //fetchDreamboothData(generationId);
    }
  }, [generatedImages]);

  //upload to web3 storage
  const uploadToWeb3Storage = async () => {
    let storedFiles = [];
    for (let i = 0; i < images.length; i++) {
      const imagefile = images[i];
      const storedFile = await storage.put([imagefile]);
      const fileUrl = `https://${storedFile.toString()}.ipfs.w3s.link/${
        imagefile.name
      }`;
      storedFiles.push(fileUrl);
      console.log("uploaded:", i, " ", fileUrl);
    }
    console.log(storedFiles);
    setImageUrls(storedFiles);
  };

  //train fine tuned model training funstion
  const trainModel = async (imageUrls: string[]): Promise<void> => {
    const modelDetails = {
      tune: {
        title: "bashy-sdxl1",
        name: "style",
        branch: "sd15",
        model_type: "lora",
        image_urls: imageUrls,
      },
    };
    try {
      const result = await axios.post("api/tunedmodels", modelDetails);
      const fineTuneResponse = result.data;
      console.log(fineTuneResponse);
    } catch (error) {
      console.error("Error training model:", error);
    }
  };

  //Check fine tuned model training status
  async function checkFineTuneStatus(model_id: string) {
    try {
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  //Fetch list of all fine tuned models
  async function fetchFineTuneList() {
    try {
      const result = await axios.get("api/tunedmodels");
      const fineTuneResponse = result.data.data;
      setListOfModels(fineTuneResponse);
      console.log(fineTuneResponse);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  //Generate image from fine tuned model
  async function CreatePrompt(model_id: string) {
    const prompt_data = {
      model_id: model_id,
      prompt: {
        text: "Girrafe painitng in sks style",
        negative_prompt: "anime",
        super_resolution: true,
        face_correct: true,
        num_images: 1,
        callback: 0,
      },
    };
    try {
      const result = await axios.post(`api/prompts/`, prompt_data);
      const PromptResponse = result.data;
      console.log(PromptResponse);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  async function fetchPromptData(promptId: string, modelId: string) {
    try {
      const result = await axios.get(`api/prompts/${promptId}`, {
        params: { model_id: modelId, prompt_id: promptId },
      });
      const promptImages = result.data.data.images;
      setGeneratedImages(promptImages);
      console.log(promptImages);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray: Array<File> = Array.from(files);
      setImages(filesArray);
    }
  };

  const handleFetchList = async () => {
    try {
      await fetchFineTuneList();
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
      negative_prompt: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-10 border-t">
          <div className="bg-background">
            <div className="lg:p-16 lg:pt-8 m-5">
              <div className="flex">
                <Avatar className="h-14 w-14 mb-2 mr-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="block">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    Model Name
                  </h2>
                  <div className="flex mb-4">
                    <p className="text-sm text-muted-foreground">
                      By Model Author
                    </p>

                    <p className="text-sm text-muted-foreground ml-3">BY NC</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2, mb-2">
                Generate images using model name
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-5/5 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prompt</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A detailed desctiption of the image you want to generate"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={toggleNegativePrompt}
                      aria-label={
                        showNegativePrompt
                          ? "Hide Negative Prompt"
                          : "Show Negative Prompt"
                      }
                    >
                      {showNegativePrompt ? (
                        <p className="text-sm text-foreground">
                          - Hide negative prompt
                        </p>
                      ) : (
                        <p className="text-sm text-foreground">
                          + Include negative prompt to avoid certain items in
                          your image
                        </p>
                      )}
                    </button>
                  </div>

                  {showNegativePrompt && (
                    <FormField
                      control={form.control}
                      name="negative_prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Negative Prompt</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Items you don't want in your image"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  <Button type="submit">Generate Image</Button>
                </form>
              </Form>

              <div className="rounded-md border border-dashed p-10 mt-4">
                {images.length === 0 ? (
                  <div className="flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      Genrated images will appear here
                    </p>
                  </div>
                ) : null}

                {generatedImages &&
                  generatedImages.map((image) => (
                    <div key={image}>
                      <img src={image} alt="generated image" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

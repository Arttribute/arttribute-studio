"use client";
import { Metadata } from "next";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import Replicate from "replicate";
import axios from "axios";
import ky from "ky";

import { Menu } from "../../../components/menu";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { set } from "mongoose";

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt must be at least 3 characters.",
  }),
  negative_prompt: z.string(),
});

export default function TunedModelPage({
  params,
}: {
  params: { slug: string };
}) {
  const [tunedModel, setTunedModel] = useState<any>(null);
  const [prompted, setPrompted] = useState(false);
  const [promptData, setPromptData] = useState<any>(null);
  const [promptId, setPromptId] = useState("");
  const [updated, setUpdated] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<string>>([]);
  const [progress, setProgress] = useState(0);
  const [showNegativePrompt, setShowNegativePrompt] = useState(false);

  //"prompt_id" is th id provided by Astria.ai while "_id" is the id of the prompt in the db

  // Function to toggle the visibility of the negative prompt field
  const toggleNegativePrompt = () => setShowNegativePrompt(!showNegativePrompt);

  useEffect(() => {
    if (!tunedModel) {
      getFineTunedModel();
    }

    if (promptId && generatedImages.length === 0) {
      fetchPromptData(promptId, tunedModel.model_id);
      incrementProgress();
    }

    if (!updated && promptId && generatedImages.length > 0) {
      updatePromptData(promptData._id);
    }
  }, [tunedModel, generatedImages, promptId]);

  //Fetch Tunedmodel by slug
  async function getFineTunedModel() {
    try {
      const { slug } = params;
      const result = await axios.get(`/api/tunedmodels/${slug}`, {
        params: { slug: slug },
      });
      const tunedModel = result.data;
      setTunedModel(tunedModel);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPromptData(promptId: string, modelId: string) {
    try {
      const result = await axios.get(`/api/prompts/${promptId}`, {
        params: { model_id: modelId, prompt_id: promptId },
      });
      const promptImages = result.data.data.images;
      setGeneratedImages(promptImages);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  //update prompt db on fetch complete
  async function updatePromptData(promptId: string) {
    const prompt_data = {
      images: generatedImages,
      status: "completed",
    };
    try {
      const result = await axios.put(`/api/prompts/${promptId}`, prompt_data, {
        params: { id: promptId },
      });
      const PromptResponse = result.data;
      setUpdated(true);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
      negative_prompt: "",
    },
  });

  //function to increment progress bar by 10% every 5 seconds
  function incrementProgress() {
    if (progress >= 100) {
      setProgress(0);
    }
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 100 : prevProgress + 10
    );
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setGeneratedImages([]);
    setPromptData(null);
    setPromptId("");
    setUpdated(false);
    setProgress(0);
    let promptToken = tunedModel.token || "sks style";
    const prompt_data = {
      model_id: tunedModel.model_id,
      prompt: {
        text: data.prompt + " " + promptToken,
        negative_prompt: data.negative_prompt,
        super_resolution: true,
        face_correct: true,
        num_images: 1,
        callback: 0,
      },
      metadata: {
        text: data.prompt,
        negative_prompt: data.negative_prompt,
        owner: "6550dac1e8faf5719ccff30c",
        tunedmodel_id: tunedModel._id,
        token: promptToken,
      },
    };
    try {
      const result = await axios.post("/api/prompts/", prompt_data);
      const PromptResponse = result.data;
      setPromptData(PromptResponse);
      setPromptId(PromptResponse.prompt_id);
      setPrompted(true);
    } catch (error) {
      console.error("Error in API call:", error);
    }
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
                  <AvatarImage src={tunedModel?.display_image} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="block">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {tunedModel?.model_name}
                  </h2>
                  <div className="flex mb-4">
                    <p className="text-sm text-muted-foreground">
                      by {tunedModel?.owner}
                    </p>

                    <p className="text-sm text-muted-foreground ml-3">
                      License: {tunedModel?.license}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2, mb-2">
                Generate images using {tunedModel?.model_name}
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
                {prompted ? (
                  generatedImages.length === 0 ? (
                    <div className="flex items-center justify-center">
                      <Progress value={progress} className="w-[60%]" />
                    </div>
                  ) : null
                ) : (
                  <div className="flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      Genrated images will appear here
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
                  {generatedImages &&
                    generatedImages.map((image) => (
                      <div className="overflow-hidden rounded-md" key={image}>
                        <img src={image} alt="generated image" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

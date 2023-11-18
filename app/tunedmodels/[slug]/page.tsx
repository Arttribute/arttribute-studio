"use client";
import { Metadata } from "next";
import { useState, useEffect } from "react";
import axios from "axios";

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
import PromptGalleryGrid from "@/components/prompt-gallery-grid";
import { User } from "@/models/User";

import { squircle } from "ldrs";
squircle.register();

import { lineWobble } from "ldrs";
lineWobble.register();

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Prompt must be at least 3 characters.",
  }),
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
  const [showNegativePrompt, setShowNegativePrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<User | null>(null);

  //"prompt_id" is th id provided by Astria.ai while "_id" is the id of the prompt in the db

  // Function to toggle the visibility of the negative prompt field
  const toggleNegativePrompt = () => setShowNegativePrompt(!showNegativePrompt);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
    if (!tunedModel) {
      getFineTunedModel();
    }

    if (promptId && generatedImages.length === 0) {
      setTimeout(() => {
        fetchPromptData(promptId, tunedModel.modeldata.model_id);
      }, 30000);
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
      setLoading(false);
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setGeneratedImages([]);
    setPromptData(null);
    setPromptId("");
    setUpdated(false);
    setLoading(true);
    let promptToken = `${tunedModel.modeldata.token} style` || "sks style";
    //<lora:${tunedModel.modeldata.model_id}:0.75>
    console.log("prompt token", promptToken);
    const prompt_data = {
      model_id: tunedModel.modeldata.model_id,
      prompt: {
        text: `${data.prompt} ${promptToken}`,
        negative_prompt: data.negative_prompt,
        super_resolution: true,
        face_correct: true,
        num_images: 1,
        callback: 0,
      },
      metadata: {
        prompt_title: data.title,
        text: data.prompt,
        negative_prompt: data.negative_prompt,
        owner: account?._id, //TODO: account should never be null
        tunedmodel_id: tunedModel.modeldata._id,
        token: promptToken,
      },
    };
    try {
      const result = await axios.post("/api/prompts/", prompt_data);
      const PromptResponse = result.data;
      setPromptData(PromptResponse);
      setPromptId(PromptResponse.prompt_id);
      if (PromptResponse.prompt_id) {
        await axios.put(
          `/api/tunedmodels/${tunedModel.modeldata._id}`,
          { prompt_count: tunedModel.modeldata.prompt_count + 1 },
          {
            params: { id: tunedModel.modeldata._id },
          }
        );
      }
      setPrompted(true);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-14 border-t">
          <div className="bg-background">
            <div className="lg:p-16 lg:pt-8 m-5">
              <div className="flex">
                <Avatar className="h-14 w-14 mb-2 mr-2">
                  <AvatarImage
                    src={tunedModel?.modeldata.display_image}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="block">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {tunedModel?.modeldata.model_name}
                  </h2>
                  <div className="flex mb-4">
                    <p className="text-sm text-muted-foreground">
                      by {tunedModel?.modeldata.owner?.name}
                    </p>

                    <p className="text-sm text-muted-foreground ml-3">
                      License: {tunedModel?.modeldata.license}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2, mb-2">
                Generate images using {tunedModel?.modeldata.model_name}
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-5/5 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A title for your creation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  {loading ? (
                    <Button disabled>
                      Generating{" "}
                      <div className="ml-2 mt-1">
                        <l-squircle
                          size="22"
                          stroke="2"
                          stroke-length="0.15"
                          bg-opacity="0.1"
                          speed="0.9"
                          color="white"
                        ></l-squircle>
                      </div>
                    </Button>
                  ) : (
                    <Button type="submit">Generate Images </Button>
                  )}
                </form>
              </Form>

              <div className="rounded-md border border-dashed p-10 mt-4">
                {prompted ? (
                  generatedImages.length === 0 ? (
                    <div className="flex items-center justify-center">
                      <l-line-wobble
                        size="400"
                        stroke="5"
                        bg-opacity="0.1"
                        speed="3"
                        color="black"
                      ></l-line-wobble>
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
              <div className="mt-8">
                <h3 className="text-xl font-semibold tracking-tight">
                  Explore other Images generated by this model
                </h3>
                <div className="container mx-auto p-4">
                  <PromptGalleryGrid prompts={tunedModel?.prompts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

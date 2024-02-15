"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { RotateCcw } from "lucide-react";

import ModelMenubar from "@/components/tunedmodels/model-menubar";
import AdvancedOptions from "@/components/tunedmodels/advanced-options";
import CreationDisplay from "@/components/tunedmodels/creation-display";
import PromptHistory from "@/components/tunedmodels/prompt-history";

import { User } from "@/models/User";

import axios from "axios";
import { set } from "mongoose";

export default function TunedModelPage({
  params,
}: {
  params: { slug: string };
}) {
  const [loadingImages, setLoadingImages] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<string>>([]);
  const [tunedModel, setTunedModel] = useState<any>(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [loadedAccount, setLoadedAccount] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [account, setAccount] = useState<User | null>(null);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [updated, setUpdated] = useState(false);
  const [promptData, setPromptData] = useState<any>(null);
  const [promptId, setPromptId] = useState("");

  const [promptText, setPromptText] = useState("");

  //Advanced options
  const [negativePrompt, setNegativePrompt] = useState("");
  const [numSteps, setNumSteps] = useState(33);
  const [cfgScale, setCfgScale] = useState(5);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [superResolution, setSuperResolution] = useState(false);
  const [privateCreation, setPrivateCreation] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [scheduler, setScheduler] = useState("Euler");
  const [colorGrading, setColorGrading] = useState("Film Velvia");

  const promptCost = 5; //TODO: get this from the db

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    setLoadedAccount(true);
    setAccount(user);
    if (!tunedModel) {
      getFineTunedModel();
    }
    if (promptId && generatedImages.length === 0) {
      setTimeout(() => {
        fetchPromptData(promptId, tunedModel.modeldata.model_id);
      }, 30000);
    }

    if (!updated && promptId && generatedImages.length != 0) {
      updatePromptData(promptData._id);
      console.log("prompt update called");
    }
  }, [tunedModel, generatedImages, promptId, updated]);

  async function getFineTunedModel() {
    setLoadingModel(true);
    try {
      const { slug } = params;
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tunedmodels/${slug}`,
        {
          params: { slug: slug },
        }
      );
      const tunedModel = result.data;
      setTunedModel(tunedModel);
      setLoadingModel(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPromptData(promptId: string, modelId: string) {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${promptId}`,
        {
          params: { model_id: modelId, prompt_id: promptId },
        }
      );
      const promptImages = result.data.data.images;
      setGeneratedImages(promptImages);
      console.log("prompt images", promptImages);
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
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/${promptId}`,
        prompt_data,
        {
          params: { id: promptId },
        }
      );
      const PromptResponse = result.data;
      setUpdated(true);
      setImagesLoaded(true);
      setLoadingImages(false);
      console.log("prompt updated", PromptResponse);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  async function setPastPromptData(prompt: any) {
    setGeneratedImages(prompt.images);
    setPromptText(prompt.text);
    setImagesLoaded(true);
    setShowResetButton(true);
  }

  async function resetCanvas() {
    setGeneratedImages([]);
    setPromptText("");
    setImagesLoaded(false);
    setShowResetButton(false);
  }

  async function onSubmit() {
    setImagesLoaded(false);
    setGeneratedImages([]);
    setPromptData(null);
    setPromptId("");
    setUpdated(false);
    setLoadingImages(true);
    let promptToken = `${tunedModel.modeldata.token} style` || "sks style";
    //<lora:${tunedModel.modeldata.model_id}:0.75>
    console.log("prompt token", promptToken);
    const prompt_data = {
      model_id: tunedModel.modeldata.model_id,
      prompt: {
        text: `${promptText} ${promptToken}`,
        negative_prompt: negativePrompt,
        super_resolution: true,
        face_correct: true,
        num_images: numberOfImages,
        callback: 0,
      },
      metadata: {
        prompt_title: ".",
        text: promptText,
        negative_prompt: negativePrompt,
        owner: account?._id, //TODO: account should never be null
        tunedmodel_id: tunedModel.modeldata._id,
        token: promptToken,
        cost: numberOfImages * promptCost,
      },
    };
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/`,
        prompt_data
      );
      const PromptResponse = result.data.newPrompt;
      setPromptData(PromptResponse);
      setPromptId(PromptResponse.prompt_id);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      if (PromptResponse.prompt_id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/tunedmodels/${tunedModel.modeldata._id}`,
          { prompt_count: tunedModel.modeldata.prompt_count + 1 },
          {
            params: { id: tunedModel.modeldata._id },
          }
        );
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  return (
    <>
      <div className="fixed md:block ">
        <ModelMenubar modelData={tunedModel?.modeldata} userData={account} />
        <div className="mt-14">
          <div className="bg-slate-100 h-screen">
            <div className="lg:grid lg:grid-cols-12">
              <div className="col-span-2">
                <AdvancedOptions />
                <div className="m-4 bg-background rounded-md shadow-md">
                  {showResetButton && (
                    <Button
                      variant="ghost"
                      className="w-full rounded-md"
                      onClick={resetCanvas}
                    >
                      <RotateCcw className="w-4 h-4 m-1 mr-2" />
                      Reset Canvas
                    </Button>
                  )}
                </div>
              </div>

              <div className="col-span-8 ml-4 bg-slate-100 rounded p-4">
                <CreationDisplay
                  loadingImages={loadingImages}
                  loadedImages={imagesLoaded}
                  generatedImages={generatedImages}
                />
                <div className="m-4">
                  <div className="grid w-full gap-2">
                    <Textarea
                      placeholder="Type your prompt here."
                      autoFocus
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      {...(loadingImages && { disabled: true })}
                    />
                    {promptText === "" ? (
                      <Button>Generate</Button>
                    ) : loadingImages ? (
                      <Button disabled>
                        Generating <Loader className="h-4 w-4 animate-spin" />
                      </Button>
                    ) : (
                      <Button onClick={onSubmit}>Generate</Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <PromptHistory
                  prompts={tunedModel?.prompts}
                  userId={account?._id}
                  setPastPromptData={setPastPromptData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw } from "lucide-react";
import { Loader, Loader2, Sparkles } from "lucide-react";

import ModelMenubar from "@/components/tunedmodels/model-menubar";
import AdvancedOptions from "@/components/tunedmodels/advanced-options";
import ControlnetOptions from "@/components/tunedmodels/controlnet-options";
import CreationDisplay from "@/components/tunedmodels/creation-display";
import PromptHistory from "@/components/tunedmodels/prompt-history";
import LoadingScreen from "@/components/tunedmodels/loading-screen";
import { ethers } from "ethers";

import { User } from "@/models/User";

import axios from "axios";
import { RequireAuthPlaceholder } from "@/components/require-auth-placeholder";

import { ModelNotReadyPalceHolder } from "@/components/tunedmodels/model-notready-placeholder";
import { Magic } from "magic-sdk";
import { useMinipay } from "@/components/providers/MinipayProvider";
import { signMinipayMessage } from "@/lib/minipay";

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
  const [checkingAttribution, setCheckingAttribution] = useState(false);
  const [attributionCheckPassed, setAttributionCheckPassed] = useState(true);
  const [attributionChecked, setAttributionChecked] = useState(false);
  const [attributionMessage, setAttributionMessage] = useState("");
  const [attributionUrl, setAttributionUrl] = useState("");
  const [attributionData, setAttributionData] = useState<any>({
    artifactId: "",
    id: "",
  });

  const [promptText, setPromptText] = useState("");
  const [pastPrompt, setPastPrompt] = useState(false);

  //Advanced options
  const [openControlnetOptions, setOpenControlnetOptions] = useState(false);
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
  const [modelReady, setModelReady] = useState(false);
  const [promptStrength, setPromptStrength] = useState(8);
  const [referenceImage, setReferenceImage] = useState("");

  const promptCost = 5; //TODO: get this from the db

  const { minipay } = useMinipay();

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
      const tunedModelExistenceTime =
        +new Date() - +new Date(tunedModel.modeldata.createdAt);
      console.log("tuned model", tunedModel);
      console.log("tuned model time", tunedModelExistenceTime);

      if (tunedModelExistenceTime < 600000) {
        setModelReady(false);
        setTimeout(() => {
          getFineTunedModel();
        }, 10000);
      } else {
        setModelReady(true);
      }
      console.log("tuned model time", tunedModelExistenceTime);
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
    console.log("Attribution data", attributionData);
    const prompt_data = {
      images: generatedImages,
      status: "completed",
      attribution_data: attributionData,
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
    setPastPrompt(true);
    setGeneratedImages(prompt.images);
    setPromptText(prompt.text);
    setPromptId(prompt._id);
    setImagesLoaded(true);
    setShowResetButton(true);
  }

  async function resetCanvas() {
    setGeneratedImages([]);
    setPromptText("");
    setPromptId("");
    setImagesLoaded(false);
    setShowResetButton(false);
  }

  const imageUrlToBase64 = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const signMessageWithEthers = async (message: string) => {
    const magic = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
      {
        network: {
          rpcUrl: "https://sepolia.base.org",
        },
      }
    );
    let rpcProvider = magic.rpcProvider;

    const provider = new ethers.BrowserProvider(rpcProvider);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(message);

    return signature;
  };

  const checkForAttribution = async () => {
    try {
      if (!referenceImage) {
        throw new Error("No reference image provided");
      }
      setCheckingAttribution(true);
      setAttributionCheckPassed(false);
      setAttributionChecked(false);
      setAttributionMessage("");

      const message = "Please sign this message to verify your identity.";

      let web3Address: string;
      let signature: string;

      if (minipay) {
        web3Address = minipay.address;
        signature = await signMinipayMessage(message);
      } else {
        web3Address = account!.web3Address;
        signature = await signMessageWithEthers(message);
      }

      const fileAsBase64 = await imageUrlToBase64(referenceImage);

      console.log("Signature:", signature);

      const requestBody = [
        {
          asset: {
            data: fileAsBase64, // Base64 string of the image
            mimetype: "image/jpeg", // Adjust the mimetype as needed
            name: "referenceImage.jpg", // Adjust the name as needed
          },
          name: "Reference Image",
          license: "Open", // Adjust the license as needed
          imageUrl: referenceImage, // Original URL
          whitelist: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"], // Adjust as needed
          blacklist: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"], // Adjust as needed
        },
      ];

      const response = await fetch(
        "https://api.arttribute.io/v2/artifacts/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-authentication-address": web3Address,
            "x-authentication-message": message,
            "x-authentication-signature": signature,
          },

          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Attribution check result:", result);
      const { data } = result;
      if (data[0].attribution === false) {
        setAttributionCheckPassed(false);
        setCheckingAttribution(false);
        setAttributionChecked(true);

        setAttributionUrl(
          `https://artifacts.arttribute.io/artifacts/${data[0].imageId}/attribute`
        );
        console.log("Attribution URL:", attributionUrl);
        setAttributionMessage(
          "Fair use checks failed. Please use the following link to make an attribution for the reference image: "
        );
      }
      if (data[0].imageId && data[0].attribution) {
        setAttributionCheckPassed(true);
        setAttributionData(data[0].attribution);
        setAttributionChecked(true);
        setCheckingAttribution(false);
        setAttributionMessage(" Fair use checks passed 👍 🎉");
      }
      if (data[0].imageId === null) {
        setAttributionCheckPassed(false);
        setCheckingAttribution(false);
        setAttributionUrl("https://artifacts.arttribute.io/artifacts/create");
        setAttributionMessage(
          "Are you the creator of this image? Register it on Arttribute artifacts registry here: "
        );
      }
      setCheckingAttribution(false);
      console.log("Attribution check complete");
    } catch (error: any) {
      console.error("Error checking for attribution:", error);
    }
  };

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
    console.log("reference image", referenceImage);

    const controlnetData = referenceImage
      ? {
          input_image_url: referenceImage,
          controlnet: "depth",
          denoising_strength: promptStrength / 10,
          controlnet_txt2img: false,
        }
      : {};

    const prompt_data = {
      model_id: tunedModel.modeldata.model_id,
      prompt: {
        text: `${promptText} ${promptToken}`,
        negative_prompt: negativePrompt,
        super_resolution: true,
        face_correct: true,
        num_images: 1,
        callback: 0,
        ...controlnetData,
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

  useEffect(() => {
    if (referenceImage) {
      checkForAttribution();
    }
  }, [referenceImage]);

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
      }, 1000);
    }

    if (!updated && promptId && generatedImages.length != 0 && !pastPrompt) {
      updatePromptData(promptData._id);
      console.log("prompt update called");
    }
  }, [tunedModel, generatedImages, promptId, updated, pastPrompt]);

  return (
    <>
      {loadingModel ? (
        <LoadingScreen />
      ) : (
        <div className="fixed md:block ">
          <ModelMenubar
            modelData={tunedModel?.modeldata}
            userData={account}
            openControlnetOptions={openControlnetOptions}
            promptStrength={promptStrength}
            setPromptStrength={setPromptStrength}
            referenceImage={referenceImage}
            setReferenceImage={setReferenceImage}
            setOpenControlnetOptions={setOpenControlnetOptions}
          />
          <div className="mt-14">
            <div className=" h-screen">
              <div className="lg:grid lg:grid-cols-12">
                <div className="hidden lg:block lg:col-span-2">
                  <AdvancedOptions
                    openControlnetOptions={openControlnetOptions}
                  />
                  <ControlnetOptions
                    promptStrength={promptStrength}
                    setPromptStrength={setPromptStrength}
                    referenceImage={referenceImage}
                    setReferenceImage={setReferenceImage}
                    setOpenControlnetOptions={setOpenControlnetOptions}
                  />

                  <div className="m-4 bg-background rounded-md shadow-md">
                    {showResetButton && (
                      <Button
                        variant="ghost"
                        className="w-full rounded-lg border border-neutral-300"
                        onClick={resetCanvas}
                      >
                        <RotateCcw className="w-4 h-4 m-1 mr-2" />
                        Reset Canvas
                      </Button>
                    )}
                  </div>
                </div>

                <div className="col-span-8 ml-4 rounded p-4">
                  {account != null ? (
                    modelReady ? (
                      <div className="lg:fixed lg:bottom-4 ">
                        <CreationDisplay
                          loadingImages={loadingImages}
                          loadedImages={imagesLoaded}
                          generatedImages={generatedImages}
                          promptId={promptId}
                          currentUserId={account?._id}
                          modelId={tunedModel?.modeldata._id}
                          attributionData={attributionData}
                        />
                        <div className="m-2">
                          <div className="grid w-full gap-2">
                            <div className="flex items-center justify-center">
                              {checkingAttribution && (
                                <div className="flex">
                                  <Loader2 className=" w-3 h-3 lg:w-4 lg:h-4 m-0.5  animate-spin" />
                                  <p className="text-xs lg:text-sm  text-neutral-500">
                                    We are performing fair use checks on the
                                    reference image
                                  </p>
                                </div>
                              )}
                              {attributionCheckPassed && (
                                <div className="flex">
                                  <p className="text-sm  text-neutral-500">
                                    {attributionMessage}
                                  </p>
                                </div>
                              )}
                              {attributionChecked &&
                                !attributionCheckPassed && (
                                  <div className="block lg:flex items-center justify-center text-center">
                                    <div className="text-sm  text-neutral-500">
                                      {attributionUrl ? (
                                        <div className="block lg:flex">
                                          <p>{attributionMessage} </p>
                                          <p className="lg:ml-1">
                                            <a
                                              href={attributionUrl}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="text-purple-500 underline"
                                            >
                                              {attributionUrl.includes("create")
                                                ? "Register image"
                                                : "Make attribution"}
                                            </a>
                                          </p>
                                        </div>
                                      ) : (
                                        <p>{attributionMessage}</p>
                                      )}
                                    </div>
                                    <button
                                      className=" border border-grey-500 rounded-lg p-1 text-sm ml-2 px-2 w-full lg:w-auto"
                                      onClick={checkForAttribution}
                                    >
                                      <p className="text-xs  bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                        Run check again
                                      </p>
                                    </button>
                                  </div>
                                )}
                            </div>

                            <Textarea
                              placeholder="Type your prompt here."
                              autoFocus
                              value={promptText}
                              onChange={(e) => setPromptText(e.target.value)}
                              {...(loadingImages && { disabled: true })}
                              className="m-1 rounded-lg"
                            />
                            {promptText === "" || !attributionCheckPassed ? (
                              <Button
                                variant="ghost"
                                className="border border-purple-500 rounded-lg"
                              >
                                <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                  Generate
                                </p>
                                <Sparkles className="w-4 h-4 m-1 text-indigo-500" />
                              </Button>
                            ) : loadingImages ? (
                              <Button
                                variant="ghost"
                                disabled
                                className="border border-purple-400 rounded-lg"
                              >
                                <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                  Generating
                                </p>
                                <Loader className="w-4 h-4 m-1 text-purple-500 animate-spin" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                onClick={onSubmit}
                                className="border border-purple-500 rounded-lg"
                              >
                                <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                  Generate
                                </p>
                                <Sparkles className="w-4 h-4 m-1 text-indigo-500" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <ModelNotReadyPalceHolder />
                    )
                  ) : null}
                  {loadedAccount && !account ? (
                    <div className="m-12">
                      <RequireAuthPlaceholder />{" "}
                    </div>
                  ) : null}
                </div>

                <div className=" col-span-12 lg:col-span-2">
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
      )}
    </>
  );
}

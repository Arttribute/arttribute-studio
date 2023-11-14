"use client";
import { Web3Storage } from "web3.storage";

import { useState, useEffect, use } from "react";

import axios from "axios";

import { Menu } from "../../components/menu";
import { Sidebar } from "../../components/sidebar";

import { playlists } from "../../data/playlists";
import { Button } from "@/components/ui/button";

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

  return (
    <>
      <div className="md:block">
        <Menu />
        <div className="mt-10 border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Test
                  </h2>
                  <div className="flex space-x-4 pb-4">
                    <input type="file" multiple onChange={handleImagesChange} />
                  </div>
                  <div className="flex space-x-4 pb-4">
                    <Button onClick={uploadToWeb3Storage}>
                      Upload to Web3 Storage
                    </Button>
                  </div>
                  <div className="flex space-x-4 pb-4">
                    <Button onClick={() => trainModel(imageUrls)}>
                      Train Model
                    </Button>
                  </div>
                  <div>
                    <p>Model ID: {tunedModelId}</p>
                    <p>Status: {status}</p>
                    <p>Message: {message}</p>
                  </div>
                  <div className="flex space-x-4 pb-4">
                    <Button onClick={() => checkFineTuneStatus(tunedModelId)}>
                      Check Model
                    </Button>
                  </div>
                  <div>
                    <Button onClick={handleFetchList}>
                      Fetch Fine Tune List
                    </Button>
                  </div>
                  <div>
                    <h3>List of models</h3>
                    {listOfModels.map((model) => (
                      <div key={model.id}>
                        <p>Model ID: {model.id}</p>
                        <p>Title: {model.title}</p>
                        <p>Token: {model.token}</p>
                        <br />
                      </div>
                    ))}
                  </div>
                  <div>
                    <Button onClick={() => CreatePrompt(tunedModelId)}>
                      Create Prompt
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => fetchPromptData("11928114", "864640")}
                    >
                      Fetch Images
                    </Button>
                  </div>
                  <div>
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
        </div>
      </div>
    </>
  );
}

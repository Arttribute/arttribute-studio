"use client";
import axios from "axios";
import { v4 as uuid } from "uuid";
import slugify from "slugify";
import { useState, useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Loader } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/models/User";
import { RequireAuthPlaceholder } from "@/components/require-auth-placeholder";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/sidebar";
import { Menu } from "@/components/menu";

import MultipleImageUpload from "@/components/multiple-image-upload";
import SelectCollectionDialog from "@/components/tunedmodels/create/selectcollection-dialog";

export default function CreateTundeModelPage() {
  const [modelname, setModelname] = useState("");
  const [description, setDescription] = useState("");
  const [collections, setCollections] = useState<Array<any>>([]);
  const [collectionId, setCollectionId] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadedAccount, setLoadedAccount] = useState(true);
  const [account, setAccount] = useState<User | null>(null);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [trainingCost, setTrainingCost] = useState(55);

  const { push } = useRouter();
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    if (!loaded && user) {
      getCollections(user._id);
    }
    if (collectionId) {
      const collection: any = collections.find(
        (collection) => collection._id === collectionId
      );
      setImageUrls(collection.images);
      console.log("Collection", collection);
      console.log("Collection Images", collection.images);
    }
  }, [loaded, collectionId]);

  async function getCollections(userId: string) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/users`,
      {
        params: { userId: userId },
      }
    );
    const data = res.data;
    console.log(data);
    setCollections(data);
    setLoaded(true);
  }

  const profileFormSchema = z.object({
    modelname: z
      .string()
      .min(2, {
        message: "modelname must be at least 2 characters.",
      })
      .max(30, {
        message: "modelname must not be longer than 30 characters.",
      }),
    collection: z.string({
      required_error: "Select a collection of artwork to train your model on",
    }),
    description: z.string().max(160).min(4),
    urls: z
      .array(
        z.object({
          value: z.string().url({ message: "Please enter a valid URL." }),
        })
      )
      .optional(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    description: "",
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function handleSubmit() {
    setLoading(true);

    const model_uuid = uuid();
    const modelDetails = {
      model: {
        title: `${modelname}-Arttribute`,
        name: "style",
        branch: "sd15",
        model_type: null,
        image_urls: imageUrls,
      },
      metadata: {
        owner: account?._id, //TODO: account should never be null
        model_name: modelname,
        cost: trainingCost,
        description: description,
        display_image: imageUrls[0],
        license: "BYSA",
        //colection_id: collection._id,
        example_prompt: "",
        slug: slugify(`${modelname}-${model_uuid}`).toLowerCase(),
        model_uuid: model_uuid,
      },
    };
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tunedmodels`,
        modelDetails
      );
      const fineTuneResponse = result.data;
      console.log(fineTuneResponse);
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(fineTuneResponse.user));
      //redirect to tuned model page
      push("/tunedmodels");
    } catch (error) {
      console.error("Error training model:", error);
    }
  }
  return (
    <>
      <div className=" md:block">
        <Menu />
        <div className="grid lg:grid-cols-5 mt-14">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 ">
            <div className="flex m-4 ">
              <Link href="/tunedmodels" passHref className="ml-3 m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{3}"
                    d="M10 19l-7-7m0 0l7-7m-7 "
                  />
                </svg>
              </Link>
              <h2 className="text-2xl font-bold  ml-1">New Tuned Model</h2>
            </div>
            {account != null ? (
              <div className="h-full px-4 py-4 lg:px-8">
                <div className="bg-background border border-dashed rounded-lg  p-8 ">
                  <div className="m-4" />
                  {account && account.credits >= trainingCost ? (
                    <div>
                      <Form {...form}>
                        <FormField
                          control={form.control}
                          name="modelname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tuned Model Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="My tuned model"
                                  {...field}
                                  onChange={(e) => setModelname(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Describe your tuned model."
                                  {...field}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="text-sm font-medium mt-4 mb-2">
                          Training Images{" "}
                        </div>
                        <div className="border border-dashed border-2 rounded-lg p-2">
                          <div className="">
                            <MultipleImageUpload
                              imageUrls={imageUrls}
                              setImageUrls={setImageUrls}
                            />
                            <div className=" flex flex-col items-center justify-center text-sm text-muted-foreground">
                              or
                            </div>
                            <SelectCollectionDialog
                              collections={collections}
                              form={form}
                              loaded={loaded}
                              setCollectionId={setCollectionId}
                            />
                          </div>
                        </div>
                        <br />

                        {loading ? (
                          <Button disabled>
                            Creating Tuned Model
                            <div className="ml-2 mt-1">
                              <Loader className="h-4 w-4 animate-spin" />
                            </div>
                          </Button>
                        ) : (
                          <Button onClick={(e) => handleSubmit()}>
                            Create Tuned Model
                          </Button>
                        )}
                      </Form>
                    </div>
                  ) : (
                    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed m-4">
                      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                        <h3 className="mt-4 text-lg font-semibold">
                          Not Enough Credits
                        </h3>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">
                          You do not have enough credits to create a new tuned
                          model. Please purchase more credits.
                        </p>
                        <Link href="/buy" passHref>
                          <Button size="sm" className="relative">
                            Buy Credits
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {loadedAccount && !account ? (
              <div className="m-12">
                <RequireAuthPlaceholder />{" "}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

import User from "@/models/User";

//example tunne
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Prompt from "@/models/Prompt";

const API_KEY = process.env.ASTRIA_API_KEY;

export async function GET() {
  try {
    await dbConnect();
    const prompts = await Prompt.find()
      .sort({ createdAt: -1 })
      .populate("tunedmodel_id")
      .populate("owner");

    return new NextResponse(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const { model_id, prompt, metadata } = await request.json();

  try {
    await dbConnect();
    const formData = new FormData();
    Object.keys(prompt).forEach((key) => {
      if (prompt[key] !== undefined) {
        formData.append(`prompt[${key}]`, prompt[key]);
      }
    });
    const promptRes = await fetch(
      `https://api.astria.ai/tunes/${model_id}/prompts`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
        },
        body: formData,
      }
    );
    const promptData = await promptRes.json();
    console.log(promptData);
    const newPrompt = await Prompt.create({
      ...metadata,
      prompt_id: promptData.id.toString(),
    });

    const user = await User.findByIdAndUpdate(
      { _id: metadata.owner },
      { $inc: { credits: -metadata.cost } },
      { new: true }
    );

    return new NextResponse(JSON.stringify({ newPrompt, user }), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";
// Define interfaces if needed for request and response

//example tunne
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Prompt from "@/models/Prompt";

const API_KEY = process.env.ASTRIA_API_KEY;

export async function POST(request: Request) {
  const { model_id, prompt, metadata } = await request.json();

  try {
    await dbConnect();
    const promptRes = await fetch(
      `https://api.astria.ai/tunes/${model_id}/prompts`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      }
    );
    const promptData = await promptRes.json();
    const newPrompt = await Prompt.create({
      ...metadata,
      prompt_id: promptData.id.toString(),
    });
    return new NextResponse(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function GET() {
  console.log("get request");
  const res = await fetch(
    "https://api.astria.ai/tunes/864530/prompts/11927426",
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}

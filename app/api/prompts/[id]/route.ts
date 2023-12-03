import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Prompt from "@/models/Prompt";
const API_KEY = process.env.ASTRIA_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt_id = searchParams.get("prompt_id");
  const model_id = searchParams.get("model_id");

  const res = await fetch(
    `https://api.astria.ai/tunes/${model_id}/prompts/${prompt_id}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    await dbConnect();
    const body = await request.json();
    const prompt = await Prompt.findByIdAndUpdate(id, body, {
      new: true,
    });
    return new NextResponse(prompt, {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

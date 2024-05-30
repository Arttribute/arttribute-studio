import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Prompt from "@/models/Prompt";
const API_KEY = process.env.ASTRIA_API_KEY;

export const revalidate = 0;

type Params = {
  id: string;
};

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

export async function PATCH(request: Request, { params }: { params: Params }) {
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");
  try {
    await dbConnect();
    const { images, status } = await request.json();
    const prompt = await Prompt.findByIdAndUpdate(
      params.id,
      { images, status },
      {
        new: true,
      }
    );
    return new NextResponse(prompt, {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

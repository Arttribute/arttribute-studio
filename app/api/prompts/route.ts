import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";
// Define interfaces if needed for request and response

//example tunne

const API_KEY = process.env.ASTRIA_API_KEY;

export async function POST(request: Request) {
  const { model_id, prompt } = await request.json();

  const res = await fetch(`https://api.astria.ai/tunes/${model_id}/prompts`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prompt),
  });
  console.log(prompt);
  const data = await res.json();
  console.log(data);
  return Response.json(data);
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

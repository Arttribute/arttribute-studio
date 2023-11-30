import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import TunedModel from "@/models/TunedModel";
import Prompt from "@/models/Prompt";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return new NextResponse("no url", {
        status: 400,
      });
    }

    try {
      const image = await axios.get(url, { responseType: "arraybuffer" });
      let returnedB64 = Buffer.from(image.data).toString("base64");
      const mimeType = image.headers["content-type"]; // Assumes content-type header is present

      return new NextResponse(`data:${mimeType};base64,${returnedB64}`, {
        status: 200,
      });
    } catch (error: any) {
      console.error(error);
      return new NextResponse(error.message, {
        status: 500,
      });
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

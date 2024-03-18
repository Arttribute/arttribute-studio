import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Challenge from "@/models/Challenge";
import Prompt from "@/models/Prompt";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const challenge = await Challenge.findOne({ slug }).populate("owner");

    return new NextResponse(JSON.stringify(challenge), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

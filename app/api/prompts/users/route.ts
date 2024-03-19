import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Prompt from "@/models/Prompt";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const prompt = await Prompt.find({ owner: userId })
      .populate("owner")
      .populate("tunedmodel_id")
      .sort({
        createdAt: -1,
      });

    return new NextResponse(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

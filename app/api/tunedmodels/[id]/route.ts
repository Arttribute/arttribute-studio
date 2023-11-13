import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import TunedModel from "@/models/TunedModel";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const tunedmodel = await TunedModel.findOne({ slug });

    return new NextResponse(JSON.stringify(tunedmodel), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

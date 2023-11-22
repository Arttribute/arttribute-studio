import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import TunedModel from "@/models/TunedModel";
import Prompt from "@/models/Prompt";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const modeldata = await TunedModel.findOne({ slug }).populate("owner");
    const prompts = await Prompt.find({
      tunedmodel_id: modeldata._id,
    })
      .populate("tunedmodel_id")
      .populate("owner");

    return new NextResponse(JSON.stringify({ modeldata, prompts }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await dbConnect();
    const body = await request.json();
    const tunedmodel = await TunedModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return new NextResponse(JSON.stringify(tunedmodel), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

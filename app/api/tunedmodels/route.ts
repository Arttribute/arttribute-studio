import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import TunedModel from "@/models/TunedModel";
import User from "@/models/User";

const API_KEY = process.env.ASTRIA_API_KEY;

export async function GET() {
  // const res = await fetch("https://api.astria.ai/tunes", {
  //   headers: {
  //     Authorization: `Bearer ${API_KEY}`,
  //   },
  // });
  // const data = await res.json();

  try {
    await dbConnect();
    const tunedmodels = await TunedModel.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(tunedmodels), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { model, metadata } = await request.json();
    const model_data = { tune: model };
    const tuneRes = await fetch("https://api.astria.ai/tunes", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model_data),
    });
    const tuneData = await tuneRes.json();
    console.log(tuneData);
    const modelData = {
      ...metadata,
      model_id: tuneData.id.toString(),
      token: tuneData.token,
    };
    const newTunedModel = await TunedModel.create(modelData);
    const user = await User.findByIdAndUpdate(
      { _id: metadata.owner },
      { $inc: { credits: -metadata.cost } },
      { new: true }
    );
    return new NextResponse(JSON.stringify({ newTunedModel, user }), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

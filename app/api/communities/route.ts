import dbConnect from "@/lib/dbConnect";
import Community from "@/models/Community";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const communities = await Community.find();
    return new NextResponse(JSON.stringify(communities), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, members, models, display_image, slug } = await req.json();

    // Create a new document using the model
    const newCommunity = new Community({
      name,
      members,
      models,
      display_image,
      slug,
    });

    // Save the new item to the database
    const savedCommunity = await newCommunity.save();

    //   return res.status(201).json(savedCommunity);
    return savedCommunity;
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error, {
      status: 500,
    });
  }
}

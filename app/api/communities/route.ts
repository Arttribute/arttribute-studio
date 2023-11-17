import dbConnect from "@/lib/dbConnect";
import Community from "@/models/Community";
// import CommunityRequest from "@/models/CommunityRequest";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const communities = await Community.find()
      .populate(["members", "models"])
      .exec();
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

    const {
      name,
      description,
      members,
      models,
      visibility,
      display_image,
      banner_image,
      slug,
      community_uuid,
    } = await req.json();

    // Create a new document using the model
    const newCommunity = new Community({
      name,
      description,
      members,
      models,
      visibility,
      display_image,
      banner_image,
      slug,
      community_uuid,
    });

    // Save the new item to the database
    const savedCommunity = await newCommunity.save();

    return new NextResponse(JSON.stringify(savedCommunity), {
      status: 201,
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error, {
      status: 500,
    });
  }
}

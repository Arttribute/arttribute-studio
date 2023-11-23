import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Collection from "@/models/Collection";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const collection = await Collection.findOne({ slug }).populate("owner");

    return new NextResponse(JSON.stringify(collection), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

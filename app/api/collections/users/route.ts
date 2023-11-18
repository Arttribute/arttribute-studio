import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Collection from "@/models/Collection";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const collection = await Collection.find({ owner: userId });

    return new NextResponse(JSON.stringify(collection), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

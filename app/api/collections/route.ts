import dbConnect from "@/lib/dbConnect";
import Collection from "@/models/Collection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const collections = await Collection.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(collections), {
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
    const requestbody = await request.json();
    const collection = await Collection.create(requestbody);

    return new NextResponse(JSON.stringify(collection), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

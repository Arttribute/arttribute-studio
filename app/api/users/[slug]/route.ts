import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Prompt from "@/models/Prompt";
import TunedModel from "@/models/TunedModel";
import Collection from "@/models/Collection";
import Challenge from "@/models/Challenge";
import { NextResponse } from "next/server";

type Params = {
  slug: string;
};

interface Fields {
  name: string;
  email: string;
  bio: string;
  tags: string[];
  fileUrl: string | null;
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
    const user = await User.findOne({ web3Address: params.slug });
    if (!user) {
      return new NextResponse("User Not Found", {
        status: 404,
      });
    }
    const prompts = await Prompt.find({ owner: user._id })
      .sort({
        createdAt: -1,
      })
      .populate("tunedmodel_id")
      .populate("owner");
    const tunedModels = await TunedModel.find({ owner: user._id }).sort({
      createdAt: -1,
    });
    const collections = await Collection.find({ owner: user._id }).sort({
      createdAt: -1,
    });
    const challenges = await Challenge.find({ owner: user._id })
      .populate("owner")
      .sort({
        createdAt: -1,
      });

    const userData = {
      user,
      prompts,
      tunedModels,
      collections,
      challenges,
    };
    return new NextResponse(JSON.stringify(userData), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
    const { name, email, fileUrl }: Fields = await request.json();

    const user = await User.findOneAndUpdate(
      { web3Address: params.slug },
      {
        name,
        email,
        picture: fileUrl,
      },
      { new: true }
    );

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
    const { name, email, bio, tags, fileUrl }: Fields = await request.json();

    const user = await User.findOneAndUpdate(
      { web3Address: params.slug },
      {
        name,
        email,
        description: bio,
        tags,
        picture: fileUrl,
      },
      { new: true }
    );

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

type Params = {
  slug: string;
};

interface Fields {
  uid: string;
  action: "follow" | "unfollow";
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
    const { uid, action }: Fields = await request.json();

    const userToUpdate = await User.findOne({ web3Address: params.slug }); // logged in user
    const userFollow = await User.findById(uid); // user being followed/unfollowed

    if (!userToUpdate || !userFollow) {
      return new NextResponse("User Not Found", {
        status: 404,
      });
    }

    if (action === "follow") {
      if (!userToUpdate.following.includes(uid)) {
        userToUpdate.following.push(uid);
      }

      if (!userFollow.followers.includes(userToUpdate._id)) {
        userFollow.followers.push(userToUpdate._id);
      }
    } else if (action === "unfollow") {
      userToUpdate.following = userToUpdate.following.filter(
        (following: any) => following.toString() !== uid
      );

      userFollow.followers = userFollow.followers.filter(
        (follower: any) => follower.toString() !== userToUpdate._id.toString()
      );
    } else {
      return new NextResponse("Invalid action", {
        status: 400,
      });
    }

    await userToUpdate.save();
    await userFollow.save();

    return new NextResponse(JSON.stringify(userToUpdate), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

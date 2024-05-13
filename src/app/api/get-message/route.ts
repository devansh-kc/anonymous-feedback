import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";

import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(session?.user._id),
        },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": -1 },
      },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" },
        },
      },
    ]);
    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          messages: "User not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        messages: user[0].messages,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error from getmessage ", error);
    return Response.json(
      {
        success: false,
        messages: "Error while fetching message",
        user,
      },
      { status: 500 }
    );
  }
}

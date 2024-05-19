import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const decodedEmail = decodeURIComponent(email);

   
    const user = await UserModel.findOne({ email: decodedEmail });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found by this email",
        },
        { status: 404 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 9);
    user.password = hashedPassword;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "user Password changed",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error while changing password",
      },
      {
        status: 500,
      }
    );
  }
}

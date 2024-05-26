import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from "bcryptjs"
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, code } = await request.json();
    const decodedEmail = decodeURIComponent(email);
    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Please enter a email ",
        },
        { status: 400 }
      );
    }
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

    const isCodeValid = user.verifyCode === code && user.verifyCodeExpiry;
    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeExpired) {
      //   (user.isVerified = true), await user.save();
      return Response.json(
        {
          status: true,
          message: "Code is correct",
        },
        { status: 200 }
      );
    } else if (!isCodeExpired) {
      return Response.json(
        {
          status: false,
          message:
            "Verification code has expired Please sign up again to get a new code",
        },
        { status: 400 }
      );
    } else {
      return Response.json({
        status: false,
        message: "Incorrect verificcation code ",
      });
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error finding  User",
      },
      { status: 500 }
    );
  }
}

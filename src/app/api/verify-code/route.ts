import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUserName = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUserName });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found ",
        },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code && user.verifyCodeExpiry;
    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeExpired) {
      (user.isVerified = true), await user.save();
      return Response.json(
        {
          status: true,
          message: "account verified Successffully",
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
        message: "Error verifying User",
      },
      { status: 500 }
    );
  }
}

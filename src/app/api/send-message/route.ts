import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import MessageModel from "@/models/Messages.model";
import { Message } from "@/models/Messages.model";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({
      username,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found ",
        },
        { status: 404 }
      );
    }
    if (!user.isAcceptMessage) {
      return Response.json(
        {
          success: false,
          message: "user is not accepting message  ",
        },
        { status: 403 }
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save;
    return Response.json(
      {
        success: true,
        message: "Message sent successfully  ",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error from send message ",error);
    return Response.json(
      {
        success: false,
        message: "Error while sending message to the user  ",
      },
      { status: 500 }
    );
  }
}

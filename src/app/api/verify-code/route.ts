import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
export async function POST(request:Request) {
    await dbConnect();
    
    
}
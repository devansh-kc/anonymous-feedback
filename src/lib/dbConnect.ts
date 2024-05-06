import mongoose from "mongoose";
type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to Db");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log(db.connections)
    connection.isConnected = db.connections[0].readyState;
    console.log("dbConnected Successfully");
  } catch (error) {
    console.log("database connection failed",error)
    process.exit()
  }
}
export default dbConnect
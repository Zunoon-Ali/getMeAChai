import connectDb from "@/db/connectDb";
import User from "@/models/User";

// export async function POST(req) {
//   await connectDb();
//   console.log("🔥 API is running, DB connected before this.");

//   return Response.json({ message: "OK" });
// }

export async function GET() {
  await connectDb();
  return Response.json({ message: "GET OK to work" });
}

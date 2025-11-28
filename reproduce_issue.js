import connectDb from "./db/connectDb.js";

process.env.MONGO_URI = "mongodb://localhost:27017/test";

console.log("Running reproduction script...");
try {
  await connectDb();
  console.log("connectDb executed successfully");
} catch (error) {
  console.error("Error in connectDb:", error);
}

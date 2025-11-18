import mongoose from "mongoose";

const connectDb = async () => {
  console.log("⏳ Trying to connect MongoDB...");

  if (mongoose.connection.readyState === 1) {
    console.log("⚡ MongoDB already connected.");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "chai",
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1);
  }
};


export default connectDb;

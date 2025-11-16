import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String },
  coverPic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// const User = ;

export default mongoose.models.User || model("User", UserSchema);

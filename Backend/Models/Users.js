import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "vendor", "staff", "admin"],
    default: "user",
  },
  assignedVendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

export const UserModel = mongoose.model("Users", Userschema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: false },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    provider: {
      type: String, // 'google', 'facebook', 'local'
      default: "local"
    },
    providerId: {
      type: String, // returned by provider
      default: null
    },

    // need to give it a default value
    avatar: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

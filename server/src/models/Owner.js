import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: false },

    role: {
      type: String,
      default: "admin"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Owner", ownerSchema);

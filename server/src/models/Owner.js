import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      default: "admin"
    },
    imageUrl: {
        type: String,
        required: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Owner", ownerSchema);

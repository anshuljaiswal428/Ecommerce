import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },

    // person who ordered
    UserID: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },

    paymentMode: {type : String, }
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);

import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, require: true, ref: "User" },
        productId: { type: mongoose.Types.ObjectId, require: true, ref: "Product" },
        disable: { type: Number, enum: [0, 1], default: 0 },
        quantity: { type: Number, require: true },
    },
    { timestamps: true }
);

export default mongoose.model("Bill", BillSchema);

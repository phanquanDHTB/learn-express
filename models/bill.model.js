import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
    {
        userId: { type: String, require: true },
        productId: { type: String, require: true },
        disable: { type: Number, enum: [0, 1], default: 0 },
        quantity: { type: Number, require: true },
    },
    { timestamps: true }
);

export default mongoose.model("Bill", BillSchema);

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        price: { type: Number, require: true },
        image: { type: String, require: true },
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);

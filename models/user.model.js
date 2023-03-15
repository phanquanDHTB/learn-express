import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        role: { type: String, default: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);

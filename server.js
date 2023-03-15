import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { loginRoute, productRoute, userRoute, billRoute } from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

mongoose
    .connect("mongodb://127.0.0.1:27017", { dbName: "test" })
    .then(() => {
        console.log("Success connect database");
    })
    .catch((err) => {
        console.log("Error connect database", error);
    });

app.use(express.json({ limit: "25mb" }));

app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/bill", billRoute);

app.listen(port, (async) => {
    console.log(`app running on port ${port}`);
});

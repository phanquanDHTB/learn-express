import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { loginRoute, productRoute, userRoute, billRoute } from "./routes/index.js";
import SocketService from "./services/socket.service.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

global._io = io;

mongoose
    .connect("mongodb://127.0.0.1:27017", { dbName: "test" })
    .then(() => {
        console.log("Success connect databasess");
    })
    .catch((err) => {
        console.log("Error connect database", error);
    });

app.use(express.json({ limit: "25mb" }));

const uri = (path) => "/api/v1/" + path;

app.use(uri("login"), loginRoute);
app.use(uri("user"), userRoute);
app.use(uri("product"), productRoute);
app.use(uri("bill"), billRoute);

global._io.on("connection", SocketService.connection);

httpServer.listen(port, (async) => {
    console.log(`app running on port ${port}`);
});

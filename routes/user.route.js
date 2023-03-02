import express from "express";
import { changePassword, createUser } from "../controllers/user.controller.js";
import { authenToken } from "../middlewares/authenToken.js";

const route = express.Router();

route.post("/create", createUser);
route.post("/change-password", authenToken, changePassword);

export default route;

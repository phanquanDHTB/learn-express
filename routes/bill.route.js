import express from "express";
import { addBillFromUser, getAllBillByAdmin } from "../controllers/bill.controller.js";
import { authenToken } from "../middlewares/authenToken.js";

const route = express.Router();
route.get("/", authenToken, getAllBillByAdmin);
route.post("/", authenToken, addBillFromUser);

export default route;

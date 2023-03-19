import express from "express";
import {
    addBillFromUser,
    deleteBill,
    editQuantity,
    getAllBillByAdmin,
    getAllBillOfUser,
} from "../controllers/bill.controller.js";
import { authenToken } from "../middlewares/authenToken.js";
import { checkAuthor } from "../middlewares/authorize.js";

const route = express.Router();
route.get("/", authenToken, checkAuthor, getAllBillByAdmin);
route.post("/", authenToken, addBillFromUser);
route.delete("/", authenToken, deleteBill);
route.post("/edit", authenToken, editQuantity);
route.get("/user", authenToken, getAllBillOfUser);

export default route;

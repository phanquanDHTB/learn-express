import express from "express";
import { createProduct, deleteProduct, getListProduct } from "../controllers/product.controller.js";
import { authenToken } from "../middlewares/authenToken.js";

const route = express.Router();

route.get("/", authenToken, getListProduct);
route.post("/", authenToken, createProduct);
route.delete("/", authenToken, deleteProduct);

export default route;

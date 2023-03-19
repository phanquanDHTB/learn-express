import express from "express";
import { createProduct, deleteProduct, getListProduct } from "../controllers/product.controller.js";
import { authenToken } from "../middlewares/authenToken.js";
import { checkAuthor } from "../middlewares/authorize.js";
import { uploadFile } from "../services/uploadDrive.service.js";
import multer from "multer";

const upload = multer();
const route = express.Router();

route.get("/", authenToken, getListProduct);
route.post("/", upload.single("image"), authenToken, checkAuthor, createProduct);
route.delete("/", authenToken, checkAuthor, deleteProduct);

export default route;

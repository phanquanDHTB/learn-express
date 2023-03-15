import ProductSchema from "../models/product.model.js";
import { success, serverInternal, invalidData } from "../utils/response.js";

const getListProduct = async (req, res) => {
    try {
        const listProduct = await ProductSchema.find();
        success(res, { listProduct });
    } catch {
        serverInternal(res);
    }
};

const createProduct = async (req, res) => {
    const { name, price, image } = req?.body;
    if ((name, price, image)) {
        try {
            await ProductSchema.create({ name, price, image });
            success(res);
        } catch {
            serverInternal(res);
        }
    } else {
        invalidData();
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.query;
    if (id) {
        try {
            await ProductSchema.findByIdAndDelete(id);
            success(res);
        } catch (err) {
            invalidData(res);
        }
    }
};

export { createProduct, deleteProduct, getListProduct };

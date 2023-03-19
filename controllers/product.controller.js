import ProductSchema from "../models/product.model.js";
import { deleteFile, uploadFile } from "../services/uploadDrive.service.js";
import { success, serverInternal, invalidData } from "../utils/response.js";

const getListProduct = async (req, res) => {
    try {
        const listProduct = await ProductSchema.find();
        return success(res, { listProduct });
    } catch (err) {
        return serverInternal(res);
    }
};

const createProduct = async (req, res) => {
    const { file } = req;
    const { name, price } = req?.body;
    if ((file, name, price)) {
        try {
            const { id, linkImage } = await uploadFile(file);
            const product = await ProductSchema.create({ name, price, image: linkImage, googleId: id });
            return success(res, { product });
        } catch {
            return serverInternal(res);
        }
    }
    invalidData(res);
};

const deleteProduct = async (req, res) => {
    const { id } = req.query;
    if (id) {
        try {
            const product = await ProductSchema.findByIdAndDelete(id);
            if (product) {
                await deleteFile(product?.googleId);
                return success(res, { product });
            }
            return invalidData(res);
        } catch (err) {
            return serverInternal(res);
        }
    }
    invalidData(res);
};

export { createProduct, deleteProduct, getListProduct };

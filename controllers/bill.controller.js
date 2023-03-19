import BillSchema from "../models/bill.model.js";
import userModel from "../models/user.model.js";
import { invalidData, serverInternal, success } from "../utils/response.js";

const addBillFromUser = async (req, res) => {
    const { productId, quantity } = req.body;
    if (productId) {
        try {
            const bill = await BillSchema.create({ userId: req.user._id, productId, quantity });
            global._io.emit("onBillSuccess", bill);
            success(res, { bill });
        } catch (err) {
            serverInternal(res);
        }
    } else {
        invalidData(res);
    }
};

const getAllBillByAdmin = async (req, res) => {
    try {
        const listBill = await BillSchema.find();
        success(res, { listBill });
    } catch {
        serverInternal(res);
    }
};

const getAllBillOfUser = async (req, res) => {
    const { userId } = req.query;
    if (userId) {
        try {
            const listBillOfUser = await BillSchema.find({ userId }).select({ disable: 0 }).populate({
                path: "productId",
                select: "name _id image",
            });
            success(res, { listBillOfUser });
        } catch {}
    } else {
        invalidData(res);
    }
};

const deleteBill = async (req, res) => {
    const { id } = req.query;
    if (id) {
        try {
            await BillSchema.findByIdAndDelete(id);
            success(res);
        } catch {
            serverInternal(res);
        }
    } else {
        invalidData(res);
    }
};

const editQuantity = async (req, res) => {
    const { id, quantity } = req.body;
    if ((id, quantity)) {
        try {
            const bill = await BillSchema.findByIdAndUpdate(id, { quantity }, { returnDocument: "after" });
            success(res, { bill });
        } catch {
            serverInternal(res);
        }
    } else {
        invalidData(res);
    }
};

export { getAllBillByAdmin, addBillFromUser, deleteBill, editQuantity, getAllBillOfUser };

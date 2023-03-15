import BillSchema from "../models/bill.model.js";
import { invalidData, serverInternal, success } from "../utils/response.js";

const addBillFromUser = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (userId && productId) {
        try {
            const bill = await BillSchema.create({ userId, productId, quantity });
            success(res, { bill });
        } catch {
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

export { getAllBillByAdmin, addBillFromUser };

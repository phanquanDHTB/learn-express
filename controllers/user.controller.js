import UserSchema from "../models/user.model.js";
import { invalidData, success } from "../utils/response.js";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../constants/auth.js";

const createUser = async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const userInfo = await UserSchema.findOne({ username });
        if (userInfo) return notFound(res, {}, "Tên tài khoản đã tồn tại!");
        if (!userInfo) {
            await UserSchema.create({
                username: username,
                password: bcrypt.hashSync(password, SALT_ROUND),
            });
            return success(res);
        }
    }
    invalidData(res);
};

const changePassword = async (req, res) => {
    const { username, password, newPassword } = req?.body;
    if (username && password) {
        const userInfo = await UserSchema.findOne({ username });
        const checkPass = bcrypt.compareSync(password, userInfo.password);
        if (userInfo && checkPass) {
            userInfo.password = bcrypt.hashSync(newPassword, SALT_ROUND);
            await userInfo.save();
            return success(res, {}, "Đổi mật khẩu thành công");
        } else {
            return invalidData(res, {}, "Tài khoản or mật khẩu không chính xác!");
        }
    }
    invalidData(res);
};

export { createUser, changePassword };

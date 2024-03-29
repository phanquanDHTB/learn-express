import UserSchema from "../models/user.model.js";
import { generateToken } from "../services/auth.service.js";
import { forbidden, notFound, serverInternal, success } from "../utils/response.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    const { username, password } = req.body;
    if ((username, password)) {
        const userInfor = await UserSchema.findOne({ username });
        const checkPass = bcrypt.compareSync(password, userInfor.password);
        if (userInfor && checkPass) {
            const accesToken = await generateToken(
                { username },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                process.env.JWT_ACCESS_TOKEN_LIFE
            );
            if (accesToken) {
                return success(res, { accesToken });
            } else {
                serverInternal(res, {}, "Đăng nhập không thành công");
            }
        } else {
            return forbidden(res, {}, "Sai tài khoản hoặc mật khẩu!");
        }
    } else {
        return forbidden(res, {}, "Vui lòng nhập đủ tài khoản hoặc mật khẩu!");
    }
};

export { login };

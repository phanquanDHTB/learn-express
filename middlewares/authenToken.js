import { verifyToken } from "../services/auth.service.js";
import { forbidden, invalidToken } from "../utils/response.js";
import UserSchema from "../models/user.model.js";

export const authenToken = async (req, res, next) => {
    const accessTokenFromHeader = req.header("Authorization")?.split(" ")[1];
    if (!accessTokenFromHeader) {
        return forbidden(res);
    }
    const verified = await verifyToken(accessTokenFromHeader, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (verified?.message) {
        return invalidToken(res, verified.message, verified.message.message);
    }
    req.user = await UserSchema.findOne({ username: verified.payload.username });
    next();
};

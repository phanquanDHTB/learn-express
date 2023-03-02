import { verifyToken } from "../services/auth.services.js";
import { forbidden, unauthorized } from "../utils/response.js";

export const authenToken = async (req, res, next) => {
    const accessTokenFromHeader = req.header("Authorization")?.split(" ")[1];
    if (!accessTokenFromHeader) {
        return forbidden(res);
    }
    const verified = await verifyToken(accessTokenFromHeader, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (verified?.message) {
        return unauthorized(res, verified.message, verified.message.message);
    }
    next();
};

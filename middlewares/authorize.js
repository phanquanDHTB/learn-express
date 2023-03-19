import { unauthorized } from "../utils/response.js";

const checkAuthor = (req, res, next) => {
    const { role } = req?.user;
    if (role !== "Admin") {
        return unauthorized(res);
    }
    next();
};

export { checkAuthor };

import jwt from "jsonwebtoken";

const generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await jwt.sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            }
        );
    } catch (error) {
        return null;
    }
};

const verifyToken = async (token, secretKey) => {
    try {
        return await jwt.verify(token, secretKey);
    } catch (error) {
        return { message: error };
    }
};

export { generateToken, verifyToken };

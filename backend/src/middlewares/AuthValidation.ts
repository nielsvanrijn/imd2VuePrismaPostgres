import { header } from "express-validator";
import { verify } from "jsonwebtoken";

// Check access token
export const isAuth = [
    header('authorization', 'Authorization header not set').notEmpty()
        .custom(async (value) => {
            if (!value) return true;
            try {
                const token = value.split(' ')[1];
                verify(token, <string>process.env.JWT_ACCESS_SECRET);
                return await Promise.resolve();
            }
            catch(err) {
                console.log(err);
                return await Promise.reject(new Error(err.message ? err.message : 'Invalid Token'));
            }
        })
];
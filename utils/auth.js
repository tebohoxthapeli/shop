import { sign, verify } from "jsonwebtoken";

export function signToken(user) {
    return sign({ ...user }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export async function isAuth(req, res, next) {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.split("Bearer ")[1];

        if (token) {
            try {
                req.user = verify(token, process.env.JWT_SECRET);
                next();
            } catch (err) {
                res.status(401).json({ message: "Token not valid" });
            }
        } else {
            res.status(401).json({ message: "Token not supplied" });
        }
    }
}

export async function isAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: "Not admin" });
    }
}

import { sign, verify } from "jsonwebtoken";

function signToken({ _id, name, email, isAdmin }) {
    return sign(
        {
            _id,
            name,
            email,
            isAdmin,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
}

async function isAuth(req, res, next) {
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

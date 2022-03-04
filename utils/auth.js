import { sign, verify } from "jsonwebtoken";

export function signToken(user) {
    return sign({ ...user }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(handler) {
    return async (req, res) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Please log in." });
        }

        const token = authorization.split("Bearer ")[1];

        if (!token) {
            return res.status(401).json({ error: "Invalid token format." });
        }

        try {
            req.user = verify(token, process.env.JWT_SECRET);
            return await handler(req, res);
        } catch (err) {
            return res.status(401).json({ error: "Token has expired or is invalid." });
        }
    };
}

export function verifyId(handler) {
    return async (req, res) => {
        if (req.query.id !== req.user._id) {
            return res
                .status(403)
                .json({ error: "You are not authorized to perform this action." });
        }

        return await handler(req, res);
    };
}

export function verifyIsAdmin(handler) {
    return async (req, res) => {
        if (!req.user.isAdmin) {
            return res
                .status(403)
                .json({ message: "You are not authorized to perform this action." });
        }

        return await handler(req, res);
    };
}

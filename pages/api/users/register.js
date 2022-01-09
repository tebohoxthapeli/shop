import { hashSync } from "bcryptjs";

import { dbConnect, dbDisconnect, convertBsonToObject } from "../../../utils/database";
import User from "../../../models/User";
import { signToken } from "../../../utils/auth";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, email, password } = req.body;

        try {
            await dbConnect();
            const foundUser = await User.findOne({ email }).select("+password").lean();

            if (foundUser) {
                res.status(401).json({ error: "Email has already been used." });
            }

            const user = await User.create({
                username,
                email,
                password: hashSync(password),
            });

            await dbDisconnect();
            const _user = convertBsonToObject(user);
            delete _user.password;
            res.status(201).json({ token: signToken(_user), ..._user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "POST method expected" });
    }
}

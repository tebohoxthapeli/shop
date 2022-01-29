import { hashSync } from "bcryptjs";

import User from "../../../models/User";
import Bag from "../../../models/Bag";
import { signToken } from "../../../utils/auth";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../../../utils/database";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "POST method expected" });

    const { password, email, username } = req.body;

    try {
        await dbConnect();
        const foundUser = await User.findOne({ email });

        if (foundUser) {
            return res
                .status(403)
                .json({ error: "The entered email address has already been used." });
        }

        let user = await User.create({
            email,
            password: hashSync(password),
            username,
        });

        user = convertBsonToObject(user);
        await Bag.create({ user: user._id });
        await dbDisconnect();
        delete user.password;
        return res.status(201).json({ token: signToken(user), ...user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

import bcrypt from "bcryptjs";

import { dbConnect, dbDisconnect } from "../../../utils/database";
import User from "../../../models/User";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        try {
            await dbConnect();
            const user = await User.findOne({ email }).select("+password").lean();
            await dbDisconnect();

            if (user && bcrypt.compareSync(password, user.password)) {
                delete user.password;
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: "Incorrect credentials entered. Try again." });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(405).json({ error: "POST method expected." });
    }
}

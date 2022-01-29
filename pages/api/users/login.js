import { compareSync } from "bcryptjs";

import { dbConnect, dbDisconnect } from "../../../utils/database";
import User from "../../../models/User";
import { signToken } from "../../../utils/auth";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "POST method expected" });

    let { email, password } = req.body;

    try {
        await dbConnect();
        const user = await User.findOne({ email }).select("+password").lean();
        await dbDisconnect();

        if (user && compareSync(password, user.password)) {
            delete user.password;
            return res.status(200).json({ token: signToken(user), ...user });
        } else {
            return res.status(401).json({ error: "Incorrect credentials entered. Try again." });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

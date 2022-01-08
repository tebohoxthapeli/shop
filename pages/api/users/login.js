import { compareSync } from "bcryptjs";

import { dbConnect, dbDisconnect } from "../../../utils/database";
import User from "../../../models/User";
import { signToken } from "../../../utils/auth";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            await dbConnect();
            const user = await User.findOne({ email }).lean();
            await dbDisconnect();

            if (user && compareSync(password, user.password)) {
                delete user.password;
                // console.log(user);
                res.status(200).json({ token: signToken(user) });
            } else {
                res.status(401).json({ error: "Incorrect credentials entered. Try again." });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "POST method expected" });
    }
}

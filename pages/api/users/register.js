import bcrypt from "bcryptjs";

import { dbConnect, dbDisconnect } from "../../../utils/database";
import User from "../../../models/User";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        try {
            await dbConnect();

            const user = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password),
            });

            await dbDisconnect();
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(405).json({ error: "POST method expected" });
    }
}

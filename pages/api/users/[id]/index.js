import User from "../../../../models/User";
import { dbConnect, dbDisconnect } from "../../../../utils/database";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "GET method expected" });
    try {
        await dbConnect();
        const user = await User.findById(req.query.id);
        await dbDisconnect();
        if (!user) return res.status(404).json({ error: "User not found." });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

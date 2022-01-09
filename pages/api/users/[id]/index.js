import User from "../../../../models/User";
import { dbConnect, dbDisconnect } from "../../../../utils/database";

export default async function handler(req, res) {
    try {
        await dbConnect();
        const user = await User.findById(req.query.id);
        await dbDisconnect();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

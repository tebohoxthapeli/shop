import Bag from "../../../../../models/Bag";
import { verifyToken } from "../../../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../../../utils/database";

async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "GET method expected." });

    try {
        await dbConnect();
        const bag = await Bag.findById(req.query.bagId);
        if (!bag) return res.status(404).json({ error: "Bag not found." });
        await dbDisconnect();
        return res.status(200).json(bag);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

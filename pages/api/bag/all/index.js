import Bag from "../../../../models/Bag";
import { verifyToken } from "../../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../../utils/database";

async function handler(req, res) {
    try {
        await dbConnect();
        const bags = await Bag.find({ user: req.user._id });
        await dbDisconnect();
        return res.status(200).json(bags);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

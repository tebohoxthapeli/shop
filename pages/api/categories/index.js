import Category from "../../../models/Category";
import { dbConnect, dbDisconnect } from "../../../utils/database";

async function handler(req, res) {
    try {
        await dbConnect();
        const categories = await Category.find({});
        await dbDisconnect();
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;

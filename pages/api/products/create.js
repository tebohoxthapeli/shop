import { dbConnect, dbDisconnect } from "../../../utils/database";
import Product from "../../../models/Product";
import { verifyToken, verifyIsAdmin } from "../../../utils/auth";

async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "POST method expected." });

    try {
        await dbConnect();
        const product = await Product.create(req.body);
        await dbDisconnect();
        return res.status(201).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyIsAdmin(handler));

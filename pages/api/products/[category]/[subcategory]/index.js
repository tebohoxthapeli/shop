import Product from "../../../../../models/Product";
import { dbConnect, dbDisconnect } from "../../../../../utils/database";

async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "GET method expected." });

    try {
        dbConnect();
        const products = await Product.find(req.query).lean();
        dbDisconnect();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;

import Product from "../../../../../../models/Product";
import { dbConnect, dbDisconnect } from "../../../../../../utils/database";

async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "GET method expected." });

    try {
        dbConnect();
        const product = await Product.findById(req.query.productId).lean();
        dbDisconnect();
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;

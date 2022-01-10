import Product from "../../../models/Product";
import { dbConnect, dbDisconnect } from "../../../utils/database";

export default async function handler(req, res) {
    try {
        await dbConnect();
        const products = await Product.find().lean();
        await dbDisconnect();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

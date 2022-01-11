import { dbConnect, dbDisconnect } from "./database";
import Product from "../models/Product";

export async function deleteProducts(req, res) {
    if (req.method !== "POST") return res.status(500).json({ error: "POST method expected." });

    try {
        dbConnect();
        await Product.deleteMany(req.query);
        dbDisconnect();
        return res.status(200).json({ message: "Deletion successful." });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

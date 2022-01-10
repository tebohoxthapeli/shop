import { dbConnect, dbDisconnect } from "../../../utils/database";
import { verifyToken, verifyIsAdmin } from "../../../utils/auth";
import Product from "../../../models/Product";

async function handler(req, res) {
    if (req.method !== "POST") return res.status(500).json({ error: "POST method expected." });
    try {
        dbConnect();
        await Product.deleteMany({});
        dbDisconnect();
        return res.status(200).json({ message: "Deletion successful." });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyIsAdmin(handler));

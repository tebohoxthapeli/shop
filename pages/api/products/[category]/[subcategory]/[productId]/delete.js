import { dbConnect, dbDisconnect } from "../../../../../../utils/database";
import Product from "../../../../../../models/Product";
import { verifyIsAdmin, verifyToken } from "../../../../../../utils/auth";

async function handler(req, res) {
    if (req.method !== "DELETE") return res.status(500).json({ error: "DELETE method expected." });

    try {
        dbConnect();
        await Product.findByIdAndDelete(req.query.productId);
        dbDisconnect();
        return res.status(200).json({ message: "Deletion successful" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyIsAdmin(handler));

import Product from "../../../../../../models/Product";
import { dbConnect, dbDisconnect } from "../../../../../../utils/database";
import { verifyToken, verifyIsAdmin } from "../../../../../../utils/auth";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    if (req.body.likes) delete req.body.likes;

    try {
        dbConnect();
        const product = await Product.findByIdAndUpdate(
            req.query.productId,
            { $set: req.body },
            { new: true }
        );
        dbDisconnect();
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyIsAdmin(handler));

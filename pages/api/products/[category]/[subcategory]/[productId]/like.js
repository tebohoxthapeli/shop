import { dbConnect, dbDisconnect } from "../../../../../../utils/database";
import { verifyToken } from "../../../../../../utils/auth";
import Product from "../../../../../../models/Product";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "POST method expected." });

    const { productId, userId } = req.query;

    try {
        dbConnect();
        const product = await Product.findById(productId).lean();
        if (!product) return res.status(404).json({ error: "Product not found." });

        let { likes } = product;

        if (likes.find((user) => user === userId)) {
            likes = likes.filter((user) => user !== userId);
        } else {
            likes.unshift(userId);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                $set: { likes },
            },
            { new: true }
        );

        await dbDisconnect();
        return res.status(200).json({ product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

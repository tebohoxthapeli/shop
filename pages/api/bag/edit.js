import Bag from "../../../models/Bag";
import { verifyToken } from "../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../utils/database";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    const findCondition = {
        user: req.user._id,
        ordered: false,
    };

    try {
        await dbConnect();
        let { products } = await Bag.findOne(findCondition).lean();

        products = products.map((product) => {
            if (product._id === req.query.productId) {
                product.quantity = req.body.quantity;
                product.total = product.quantity * product.price;
            }
            return product;
        });

        const updatedBag = await Bag.findOneAndUpdate(
            findCondition,
            { $set: { products } },
            { new: true }
        );

        await dbDisconnect();
        return res.status(200).json(updatedBag);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

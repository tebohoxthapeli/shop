import { verifyToken } from "../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../utils/database";
import Bag from "../../../models/Bag";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    const findCondition = {
        user: req.user._id,
        ordered: false,
    };

    try {
        await dbConnect();
        const { products } = await Bag.findOne(findCondition).lean();

        const bag = await Bag.findOneAndUpdate(
            findCondition,
            {
                $set: {
                    products: products.filter(({ _id }) => _id !== req.query.productId),
                },
            },
            { new: true }
        );

        await dbDisconnect();
        return res.status(200).json(bag);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

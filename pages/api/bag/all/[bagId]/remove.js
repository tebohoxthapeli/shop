import { verifyToken } from "../../../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../../../utils/database";
import Bag from "../../../../../models/Bag";
import Order from "../../../../../models/Order";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    const { bagId } = req.query;

    try {
        await dbConnect();
        const order = await Order.findOne({ bag: bagId, status: "Pending" });

        if (!order) {
            return res.status(409).json({
                error: "Action cannot be completed. The order connected to this bag is either already being shipped or has arrived at its destination.",
            });
        }

        const { products } = await Bag.findById(bagId).lean();

        const bag = await Bag.findByIdAndUpdate(
            bagId,
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

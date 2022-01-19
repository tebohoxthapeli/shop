import { verifyToken } from "../../../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../../../utils/database";
import Bag from "../../../../../models/Bag";
import Order from "../../../../../models/Order";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    const { bagId } = req.query;

    try {
        await dbConnect();
        const order = await Order.findOne({ bag: bagId, status: "Pending" }).lean();

        if (!order) {
            return res.status(409).json({
                error: "Action cannot be completed. The order connected to this bag is either already being shipped or has arrived at its destination.",
            });
        }

        let { products } = await Bag.findById(bagId).lean();
        products = products.filter(({ _id }) => _id !== req.query.productId);

        await Order.findByIdAndUpdate(
            order._id,
            {
                $set: { subtotal: products.reduce((sum, { total }) => sum + total, 0) },
            },
            { new: true }
        );

        const bag = await Bag.findByIdAndUpdate(bagId, { $set: { products } }, { new: true });

        await dbDisconnect();
        return res.status(200).json(bag);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

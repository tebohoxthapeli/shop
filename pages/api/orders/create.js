import Order from "../../../models/Order";
import Bag from "../../../models/Bag";
import { verifyToken } from "../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../utils/database";

async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "POST method expected." });

    const user = req.user._id;

    try {
        await dbConnect();

        const { _id, products } = await Bag.findOneAndUpdate(
            { user, ordered: false },
            { $set: { ordered: true } },
            { new: true }
        ).lean();

        const subtotal = products.reduce((sum, { total }) => sum + total, 0);
        const order = await Order.create({ user, bag: _id, subtotal });
        await Bag.create({ user });
        await dbDisconnect();
        return res.status(200).json(order);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

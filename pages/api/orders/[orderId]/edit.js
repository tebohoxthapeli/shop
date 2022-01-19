import { verifyToken } from "../../../../utils/auth";
import Order from "../../../../models/Order";
import { dbConnect, dbDisconnect } from "../../../../utils/database";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    const { orderId } = req.query;
    const { status } = req.body;

    try {
        await dbConnect();
        const order = await Order.findById(orderId).lean();

        if (status === "Cancelled") {
            if (order.status !== "Pending") {
                return res.status(409).json({
                    error: "Action cannot be completed. This order is either already being shipped or has arrived at its destination.",
                });
            }
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { $set: { status } },
            { new: true }
        );

        await dbDisconnect();
        return res.status(200).json({ order: updatedOrder });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

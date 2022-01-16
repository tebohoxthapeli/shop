import { verifyToken } from "../../../../utils/auth";
import Order from "../../../../models/Order";
import { dbConnect, dbDisconnect } from "../../../../utils/database";

async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "GET method expected." });

    try {
        await dbConnect();
        const order = await Order.findById(req.query.orderId);
        await dbDisconnect();
        return res.status(200).json(order);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

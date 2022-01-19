import { dbConnect, dbDisconnect } from "../../../utils/database";
import { verifyToken } from "../../../utils/auth";
import Order from "../../../models/Order";

async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "GET method expected." });

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        await dbConnect();

        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$subtotal",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);

        await dbDisconnect();
        return res.status(200).json(income);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

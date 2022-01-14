import User from "../../../models/User";
import { verifyToken } from "../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../utils/database";

async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "GET method expected." });

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); // last year today

    try {
        await dbConnect();

        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        await dbDisconnect();

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

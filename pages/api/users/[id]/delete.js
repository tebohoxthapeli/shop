import { dbConnect, dbDisconnect } from "../../../../utils/database";
import User from "../../../../models/User";
import Bag from "../../../../models/Bag";
import Order from "../../../../models/Bag";
import { verifyToken, verifyId } from "../../../../utils/auth";
import { compareSync } from "bcryptjs";

async function handler(req, res) {
    if (req.method !== "DELETE") return res.status(405).json({ error: "DELETE method expected." });

    const userId = req.query.id;

    try {
        await dbConnect();
        const user = await User.findById(userId).select("+password").lean();

        if (!user) {
            await dbDisconnect();

            return res
                .status(409)
                .json({ error: "User account not deleted because it did not exist." });
        }

        if (!compareSync(req.body.password, user.password)) {
            await dbDisconnect();

            return res.status(401).json({ error: "Incorrect password entered. Try again." });
        }

        await User.findByIdAndDelete(userId);
        await Bag.deleteMany({ user: userId });
        await Order.deleteMany({ user: userId });
        await dbDisconnect();
        return res.status(200).json({ message: "User account successfully deleted." });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyId(handler));

import { dbConnect, dbDisconnect } from "../../../../utils/database";
import User from "../../../../models/User";
import Bag from "../../../../models/Bag";
import { verifyToken, verifyId } from "../../../../utils/auth";

async function handler(req, res) {
    if (req.method !== "DELETE") return res.status(405).json({ error: "DELETE method expected." });
    const user = req.query.id;

    try {
        await dbConnect();
        const deletedUser = await User.findByIdAndDelete(user);

        if (!deletedUser) {
            await dbDisconnect();
            return res
                .status(409)
                .json({ error: "User account not deleted because it did not exist." });
        } else {
            await Bag.findOneAndDelete({ user });
            await dbDisconnect();
            return res.status(200).json({ message: "User account successfully deleted." });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyId(handler));

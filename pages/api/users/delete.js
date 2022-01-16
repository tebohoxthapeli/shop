import User from "../../../models/User";
import { dbConnect, dbDisconnect } from "../../../utils/database";
import { verifyToken, verifyIsAdmin } from "../../../utils/auth";

async function handler(req, res) {
    if (req.method !== "DELETE") return res.status(405).json({ error: "DELETE method expected." });

    try {
        await dbConnect();
        await User.deleteMany({});
        await dbDisconnect();
        return res.status(200).json({ message: "Users deleted" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyIsAdmin(handler));

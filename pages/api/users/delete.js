import User from "../../../models/User";
import { dbConnect, dbDisconnect } from "../../../utils/database";

export default async function handler(req, res) {
    try {
        await dbConnect();
        await User.deleteMany({});
        await dbDisconnect();
        res.status(200).json({ message: "Users deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

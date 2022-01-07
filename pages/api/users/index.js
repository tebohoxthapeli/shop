import { dbConnect, dbDisconnect } from "../../../utils/database";
import User from "../../../models/User";

export default async function handler(_, res) {
    try {
        await dbConnect();

        const users = await User.find();

        await dbDisconnect();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

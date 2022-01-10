import User from "../../../../models/User";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../../../../utils/database";
import { verifyToken, verifyId, signToken } from "../../../../utils/auth";

async function handler(req, res) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "PUT method expected" });
    }

    try {
        await dbConnect();
        const email = req.body.email;

        if (email) {
            const foundUser = await User.findOne({ email });
            if (foundUser) return res.status(403).json({ error: "Email already in use" });
        }

        const user = await User.findByIdAndUpdate(req.query.id, { $set: req.body }, { new: true });
        await dbDisconnect();

        const _user = convertBsonToObject(user);
        return res.status(200).json({ token: signToken(_user), ..._user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyId(handler));

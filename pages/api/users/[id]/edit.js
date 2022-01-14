import User from "../../../../models/User";
import { verifyToken, verifyId, signToken } from "../../../../utils/auth";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../../../../utils/database";

async function handler(req, res) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "PUT method expected" });
    }

    try {
        await dbConnect();
        const email = req.body.email;
        const foundUser = await User.findOne({ email });

        if (foundUser) {
            const { email } = convertBsonToObject(foundUser);

            if (email !== req.user.email) {
                return res.status(403).json({ error: "Email already in use" });
            }
        }

        let user = await User.findByIdAndUpdate(req.query.id, { $set: req.body }, { new: true });

        await dbDisconnect();

        user = convertBsonToObject(user);
        return res.status(200).json({ token: signToken(user), ...user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyId(handler));

import User from "../../../../models/User";
import { verifyToken, verifyId, signToken } from "../../../../utils/auth";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../../../../utils/database";
import { compareSync, hashSync } from "bcryptjs";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    const { oldPassword, newPassword } = req.body;
    const userId = req.query.id;

    try {
        await dbConnect();
        const user = await User.findById(userId).select("+password").lean();
        if (!user) return res.status(404).json({ error: "User account not found." });

        if (!compareSync(oldPassword, user.password)) {
            return res.status(401).json({ error: "Incorrect password entered. Try again." });
        }

        let updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: { password: hashSync(newPassword) },
            },
            { new: true }
        );

        await dbDisconnect();

        updatedUser = convertBsonToObject(updatedUser);
        return res.status(200).json({ token: signToken(updatedUser), ...updatedUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(verifyId(handler));

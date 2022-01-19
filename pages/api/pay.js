import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);
import { verifyToken } from "../../utils/auth";

async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "POST method expected." });

    try {
        // await dbConnect();
        // await dbDisconnect();

        stripe.charges.create(
            {
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd",
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) return res.status(500).json(stripeErr);
                return res.status(200).json(stripeRes);
            }
        );

        return res.status(200).json({});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

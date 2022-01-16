import Bag from "../../../../../models/Bag";
import Order from "../../../../../models/Order";
import { verifyToken } from "../../../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../../../utils/database";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    const { bagId } = req.query;
    const { _id, quantity } = req.body;

    try {
        await dbConnect();
        const order = await Order.findOne({ bag: bagId, status: "Pending" });

        if (!order) {
            return res.status(409).json({
                error: "Action cannot be completed. The order connected to this bag is either already being shipped or has arrived at its destination.",
            });
        }

        const { products } = await Bag.findById(bagId).lean();
        let foundIndex;

        const foundProduct = products.find((product, index) => {
            if (product._id === _id) {
                foundIndex = index;
                product.quantity = quantity;
                product.total = quantity * product.price;
                return product;
            }
        });

        if (!foundProduct) {
            return res.status(403).json({ error: "New products cannot be added to this bag." });
        }

        products[foundIndex] = foundProduct;

        const bag = await Bag.findByIdAndUpdate(bagId, { $set: { products } }, { new: true });

        await dbDisconnect();
        return res.status(200).json(bag);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

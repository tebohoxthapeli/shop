import Bag from "../../../models/Bag";
import { verifyToken } from "../../../utils/auth";
import { dbConnect, dbDisconnect } from "../../../utils/database";

async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).json({ error: "PUT method expected." });

    const { _id, quantity, price } = req.body;
    const findCondition = {
        user: req.user._id,
        ordered: false,
    };

    try {
        await dbConnect();
        const { products } = await Bag.findOne(findCondition).lean();
        let foundIndex;

        const foundProduct = products.find((product, index) => {
            if (product._id === _id) {
                foundIndex = index;
                product.quantity = quantity ? quantity : ++product.quantity;
                product.total = product.quantity * product.price;
                return product;
            }
        });

        if (foundProduct) {
            products[foundIndex] = foundProduct;
        } else {
            const total = quantity ? quantity * price : price;
            products.unshift({ total, ...req.body });
        }

        const updatedBag = await Bag.findOneAndUpdate(
            findCondition,
            { $set: { products } },
            { new: true }
        );

        await dbDisconnect();
        return res.status(200).json({ bag: updatedBag });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default verifyToken(handler);

import Category from "../../../models/Category";
import { dbConnect, dbDisconnect } from "../../../utils/database";

const categoryArray = [
    {
        name: "Shirts",
        subcategories: ["Graphic Tees", "Formal", "Casual", "Golf Shirts"],
    },
    {
        name: "Dresses",
        subcategories: ["Floral", "Skirts", "Long", "Formal"],
    },
    {
        name: "Jackets and Coats",
        subcategories: ["Blazers", "Denim Jackets", "Hoodies", "Windbreakers"],
    },
    {
        name: "Bottoms",
        subcategories: ["Jeans", "Shorts", "Cargo", "Track Pants"],
    },
    {
        name: "Shoes",
        subcategories: ["Boots", "Running", "Heels", "Sneakers"],
    },
];

async function handler(req, res) {
    try {
        await dbConnect();
        const categories = await Category.create(categoryArray);
        await dbDisconnect();
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;

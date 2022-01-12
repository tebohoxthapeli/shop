import { dbConnect, dbDisconnect } from "./database";
import Product from "../models/Product";

export async function deleteProducts(req, res) {
    if (req.method !== "DELETE") return res.status(500).json({ error: "DELETE method expected." });

    try {
        dbConnect();
        await Product.deleteMany(req.query);
        dbDisconnect();
        return res.status(200).json({ message: "Deletion successful." });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function getProducts(req, res) {
    if (req.method !== "GET") return res.status(500).json({ error: "GET method expected." });
    
    let { sortBy, maxPrice, brand, limit, ...rest } = req.query;
    if (!limit) limit = 0;
    let sort;

    switch (sortBy) {
        case "mostPopular": {
            sort = { likeCount: "desc" };
            break;
        }

        case "leastPopular": {
            sort = { likeCount: "asc" };
            break;
        }

        case "highestPrice": {
            sort = { price: "desc" };
            break;
        }

        case "lowestPrice": {
            sort = { price: "asc" };
            break;
        }

        default: {
            sort = { createdAt: "desc" };
        }
    }

    try {
        dbConnect();
        let products;

        if (brand) {
            products = await Product.find(rest)
                .where("price")
                .lte(maxPrice)
                .where("brand")
                .in(brand)
                .sort(sort)
                .limit(parseInt(limit))
                .lean();
        } else {
            products = await Product.find(rest)
                .where("price")
                .lte(maxPrice)
                .sort(sort)
                .limit(parseInt(limit))
                .lean();
        }

        dbDisconnect();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

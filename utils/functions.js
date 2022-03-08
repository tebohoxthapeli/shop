import Product from "../models/Product";
import { convertBsonToObject, dbConnect, dbDisconnect } from "./database";

export async function deleteProducts(req, res) {
    if (req.method !== "DELETE") return res.status(500).json({ error: "DELETE method expected." });

    try {
        await dbConnect();
        await Product.deleteMany(req.query);
        await dbDisconnect();
        return res.status(200).json({ message: "Deletion successful." });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// for use with API routes:

export async function getProducts(req, res) {
    if (req.method !== "GET") return res.status(500).json({ error: "GET method expected." });

    let { sortBy, maxPrice, brand, limit, ...rest } = req.query;
    if (!limit) limit = 0;
    if (!maxPrice) maxPrice = 10000;
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
        await dbConnect();
        let products;

        if (brand) {
            products = await Product.find(rest)
                .where("price")
                .lte(maxPrice)
                .where("brand")
                .in(brand)
                .sort(sort)
                .limit(parseInt(limit));
        } else {
            products = await Product.find(rest)
                .where("price")
                .lte(maxPrice)
                .sort(sort)
                .limit(parseInt(limit));
        }

        await dbDisconnect();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// for use with getStaticProps / getServerSideProps

// export async function findProducts(query) {
//     /*
//         shape of query: {
//             category,
//             subcategory?,
//             sortBy?,
//             maxPrice?,
//             brand?: [],
//             limit?
//         }
//     */

//     let { sortBy, maxPrice, limit, brand, ...findCondition } = query;
//     maxPrice = maxPrice || 10000;
//     limit = parseInt(limit) || 0; // 0 will get all items

//     switch (sortBy) {
//         case "mostPopular": {
//             sortBy = { likeCount: "desc" };
//             break;
//         }
//         case "leastPopular": {
//             sortBy = { likeCount: "asc" };
//             break;
//         }
//         case "highestPrice": {
//             sortBy = { price: "desc" };
//             break;
//         }
//         case "lowestPrice": {
//             sortBy = { price: "asc" };
//             break;
//         }
//         default: {
//             sortBy = { createdAt: "desc" };
//         }
//     }

//     try {
//         await dbConnect();
//         let products;

//         if (brand) {
//             products = await Product.find(findCondition)
//                 .where("brand")
//                 .in(brand)
//                 .where("price")
//                 .lte(maxPrice)
//                 .limit(limit)
//                 .sort(sortBy);
//         } else {
//             products = await Product.find(findCondition)
//                 .where("price")
//                 .lte(maxPrice)
//                 .limit(limit)
//                 .sort(sortBy);
//         }

//         await dbDisconnect();
//         return convertBsonToObject(products);
//     } catch (err) {
//         console.log("Error:", err.message);
//     }
// }

export async function findProducts(query) {
    try {
        await dbConnect();
        const products = convertBsonToObject(await Product.find(query).sort({ createdAt: "desc" }));
        await dbDisconnect();
        return products;
    } catch (error) {
        console.log("findProducts:", error.message);
    }
}

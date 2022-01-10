import Product from "../../../models/Product";
import { dbConnect, dbDisconnect } from "../../../utils/database";

const productArray = [
    // shirts
    {
        productName: "Tbar art t-shirt",
        brand: "Cotton On",
        price: 209,
        image: "/images/shirts/graphic tee.jpg",
        category: "Shirts",
        subcategory: "Graphic Tees",
        sizes: ["XS", "M", "L", "XL"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Tech long sleeve shirt",
        brand: "Hi-Tec",
        price: 899,
        image: "/images/shirts/formal shirt.jpg",
        category: "Shirts",
        subcategory: "Formal",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Pink", "Black", "Yellow", "Blue"],
    },
    {
        productName: "Regular fit lightweight textured shirt",
        brand: "Lark & Crosse",
        price: 479,
        image: "/images/shirts/casual shirt.jpg",
        category: "Shirts",
        subcategory: "Casual",
        sizes: ["XS", "M", "L", "XL"],
        colours: ["Black", "White", "Grey", "Yellow"],
    },
    {
        productName: "Pique knit mandarin shirt",
        brand: "Superbalist",
        price: 399,
        image: "/images/shirts/golf shirt.jpg",
        category: "Shirts",
        subcategory: "Golf Shirts",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },

    // dresses

    {
        productName: "Floral knit dress",
        brand: "Trendyol",
        price: 499,
        image: "/images/dresses/floral 2.jpg",
        category: "Dresses",
        subcategory: "Floral",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Organza dress",
        brand: "Glamorous",
        price: 899,
        image: "/images/dresses/skirt.jpg",
        category: "Dresses",
        subcategory: "Skirts",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Plunge neck tiered maxi dress",
        brand: "Velvet",
        price: 699,
        image: "/images/dresses/long dress.jpg",
        category: "Dresses",
        subcategory: "Long",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Assym pencil bodycon dress",
        brand: "Edit",
        price: 349,
        image: "/images/dresses/formal dress.jpg",
        category: "Dresses",
        subcategory: "Formal",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },

    // jackets

    {
        productName: "Bislave blazer",
        brand: "Mango",
        price: 1699,
        image: "/images/jackets and coats/blazer.jpg",
        category: "Jackets & Coats",
        subcategory: "Blazers",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "M boyce-r denim jacket",
        brand: "Soviet",
        price: 699,
        image: "/images/jackets and coats/denim jacket.jpg",
        category: "Jackets & Coats",
        subcategory: "Demin Jackets",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Rollin Skull hoodie",
        brand: "Chrome Roses",
        price: 999,
        image: "/images/jackets and coats/hoodie.jpg",
        category: "Jackets & Coats",
        subcategory: "Hoodies",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Trefoil area 33 coach jacket",
        brand: "Adidas",
        price: 1899,
        image: "/images/jackets and coats/windbreaker.jpg",
        category: "Jackets & Coats",
        subcategory: "Windbreakers",
        sizes: ["XS", "S", "M", "L"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },

    // bottoms

    {
        productName: "3301 straight",
        brand: "G-Star RAW",
        price: 2199,
        image: "/images/bottoms/jeans.jpg",
        category: "Bottoms",
        subcategory: "Jeans",
        sizes: ["28", "30", "32", "34"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Boulevard shorts",
        brand: "Glamorous",
        price: 349,
        image: "/images/bottoms/shorts.jpg",
        category: "Bottoms",
        subcategory: "Shorts",
        sizes: ["28", "30", "32", "34"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "3D straight tapered cargo",
        brand: "G-Star RAW",
        price: 2599,
        image: "/images/bottoms/cargo.jpg",
        category: "Bottoms",
        subcategory: "Cargo",
        sizes: ["28", "30", "32", "34"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Beckenbauer track pants",
        brand: "Adidas",
        price: 1499,
        image: "/images/bottoms/track pants.jpg",
        category: "Bottoms",
        subcategory: "Track Pants",
        sizes: ["28", "30", "32", "34"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },

    // shoes

    {
        productName: "Pinaforel heels",
        brand: "Miss Black",
        price: 579,
        image: "/images/shoes/heels.jpg",
        category: "Shoes",
        subcategory: "Heels",
        sizes: ["4", "5", "6", "7", "8", "9"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Dr Martens 1460 Bex",
        brand: "Dr Martens",
        price: 3599,
        image: "/images/shoes/boots.jpg",
        category: "Shoes",
        subcategory: "Boots",
        sizes: ["4", "5", "6", "7", "8", "9"],
        colours: ["Yellow", "Black"],
    },
    {
        productName: "HVW unlimited",
        brand: "Adidas",
        price: 1299,
        image: "/images/shoes/running shoes.jpg",
        category: "Shoes",
        subcategory: "Running",
        sizes: ["4", "5", "6", "7", "8", "9"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
    {
        productName: "Air Jordan 3 Retro",
        brand: "Nike",
        price: 1499,
        image: "/images/shoes/sneakers.jpg",
        category: "Shoes",
        subcategory: "Sneakers",
        sizes: ["4", "5", "6", "7", "8", "9"],
        colours: ["Green", "Red", "Purple", "Blue"],
    },
];

export default async function handler(req, res) {
    try {
        await dbConnect();
        await Product.create(productArray);
        await dbDisconnect();
        return res.status(201).json({ message: "Products created" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

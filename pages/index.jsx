import Box from "@mui/material/Box";

import Product from "../models/Product";
import Slider from "../components/Slider";
import Category from "../models/Category";
import Main from "../components/home/Main";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../utils/database";

export default function Home(props) {
    return (
        <Box>
            <Slider />
            <Main {...props} />
        </Box>
    );
}

export async function getStaticProps() {
    try {
        await dbConnect();
        const categories = convertBsonToObject(await Category.find({}));
        const products = convertBsonToObject(await Product.find({}).sort({ createdAt: "desc" }));
        await dbDisconnect();

        return {
            props: {
                categories,
                categoryProducts: categories.map(({ name }) => {
                    return {
                        category: name,
                        products: products.filter(({ category }) => category === name).slice(0, 3),
                    };
                }),
            },
        };
    } catch (err) {
        console.log("Error:", err.message);
        return;
    }
}

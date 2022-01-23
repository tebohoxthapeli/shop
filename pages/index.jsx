import Slider from "../components/Slider";
import Main from "../components/home/Main";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../utils/database";
import Category from "../models/Category";
import Product from "../models/Product";

export default function Home(props) {
    return (
        <div>
            <Slider />
            <Main {...props} />
        </div>
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

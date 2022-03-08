// MUI imports:
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Component imports:
import Main from "../../../components/categoryAndSubcategory/Main";
import BreadcrumbComponent from "../../../components/BreadCrumbs";
import Sidebar from "../../../components/categoryAndSubcategory/Sidebar";

// Models and utility imports:
import { findProducts } from "../../../utils/functions";
import ProductModel from "../../../models/Product";
import { convertBsonToObject, dbConnect, dbDisconnect } from "../../../utils/database";
import { FilterContextProvider } from "../../../context/productFilterContext/FilterDataLayer";

export default function Subcategory({ products }) {
    return (
        <FilterContextProvider>
            <Box sx={{ p: 4 }}>
                <BreadcrumbComponent />

                <Grid container columnSpacing={4}>
                    <Grid item xs={3}>
                        <Sidebar />
                    </Grid>

                    <Grid item xs={9}>
                        <Main products={products} />
                    </Grid>
                </Grid>
            </Box>
        </FilterContextProvider>
    );
}

export async function getStaticPaths() {
    try {
        await dbConnect();
        const products = convertBsonToObject(await ProductModel.find({}));
        await dbDisconnect();

        const paths = products.map(({ category, subcategory }) => ({
            params: { category, subcategory },
        }));

        return {
            paths,
            fallback: false,
        };
    } catch (error) {
        console.log("getStaticPaths error:", error.message);
        return;
    }
}

export async function getStaticProps({ params }) {
    try {
        const products = await findProducts(params);

        return {
            props: { products },
            revalidate: 10,
        };
    } catch (error) {
        console.log("getStaticProps error:", error.message);
        return;
    }
}

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { findProducts } from "../../utils/functions";
import CategoryModel from "../../models/Category";
import Main from "../../components/categoryAndSubcategory/Main";
import BreadcrumbComponent from "../../components/BreadCrumbs";
import Sidebar from "../../components/categoryAndSubcategory/Sidebar";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../../utils/database";

export default function Category(props) {
    const allCategoryBrands = props.allCategoryProducts.map(({ brand }) => brand);

    return (
        <Box sx={{ p: 4 }}>
            <BreadcrumbComponent />

            <Grid container columnSpacing={4}>
                <Grid item xs={3}>
                    <Sidebar category={props.category} allBrands={allCategoryBrands} />
                </Grid>

                <Grid item xs={9}>
                    <Main {...props} />
                </Grid>
            </Grid>
        </Box>
    );
}

export async function getServerSideProps({ query }) {
    try {
        const allCategoryProducts = await findProducts({ category: query.category });
        const products = await findProducts(query);

        if (products.length === 0) {
            return {
                notFound: true,
            };
        }

        await dbConnect();
        const category = convertBsonToObject(await CategoryModel.findOne({ name: query.category }));
        await dbDisconnect();

        return {
            props: {
                category,
                products,
                allCategoryProducts,
            },
        };
    } catch (err) {
        console.log("Error:", err.message);
        return;
    }
}

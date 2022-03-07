import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { findProducts } from "../../../utils/functions";
import Main from "../../../components/categoryAndSubcategory/Main";
import BreadcrumbComponent from "../../../components/BreadCrumbs";
import Sidebar from "../../../components/categoryAndSubcategory/Sidebar";

export default function Subcategory(props) {
    const allSubcategoryBrands = props.allSubcategoryProducts.map(({ brand }) => brand);
    return (
        <Box sx={{ p: 4 }}>
            <BreadcrumbComponent />

            <Grid container columnSpacing={4}>
                <Grid item xs={3}>
                    <Sidebar allBrands={allSubcategoryBrands} />
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
        const allSubcategoryProducts = await findProducts({
            category: query.category,
            subcategory: query.subcategory,
        });

        const products = await findProducts(query);

        if (products.length === 0) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                subcategory: query.subcategory,
                products,
                allSubcategoryProducts,
            },
        };
    } catch (err) {
        console.log("Error:", err.message);
        return;
    }
}

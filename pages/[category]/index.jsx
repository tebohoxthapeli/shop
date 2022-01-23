import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import BreadcrumbComponent from "../../components/BreadCrumbs";
import SingleCategorySidebar from "../../components/category/SingleCategorySidebar";
import AllProducts from "../../components/category/AllProducts";
import { findProducts } from "../../utils/functions";

export default function Category() {
    return (
        <Box sx={{ px: 4 }}>
            <BreadcrumbComponent />

            <Stack direction="row" spacing={4} sx={{ my: 4 }}>
                <SingleCategorySidebar />
                <AllProducts />
            </Stack>
        </Box>
    );
}

export async function getServerSideProps({ query }) {
    const products = await findProducts(query);

    if (products.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: { products },
    };
}

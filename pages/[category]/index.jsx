import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import BreadcrumbComponent from "../../components/BreadCrumbs";
import SingleCategorySidebar from "../../components/categoryPage/SingleCategorySidebar";
import AllProducts from "../../components/categoryPage/AllProducts";

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

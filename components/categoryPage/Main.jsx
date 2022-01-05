import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import BreadcrumbComponent from "../BreadCrumbs";
import SingleCategorySidebar from "./SingleCategorySidebar";
import AllProducts from "./AllProducts";

export default function Main() {
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

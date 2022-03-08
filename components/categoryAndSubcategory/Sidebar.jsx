import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SortBy from "./SortBy";
import MaxPrice from "./MaxPrice";
import Brands from "./Brands";
import Subcategories from "./Subcategories";

export default function Sidebar({ subcategories }) {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
                Filters
            </Typography>

            <SortBy />
            <MaxPrice />
            <Brands />
            {subcategories && <Subcategories subcategories={subcategories} />}
        </Box>
    );
}

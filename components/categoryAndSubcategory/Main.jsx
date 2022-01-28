import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Product from "../Product";

export default function Main({ products, category, subcategory }) {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {subcategory ? subcategory : category.name}: All
            </Typography>

            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={4} key={product._id}>
                        <Product {...product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

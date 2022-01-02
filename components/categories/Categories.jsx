import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Sidebar from "./Sidebar";
import Product from "./Product";
import { categories } from "../../utils/data";

export default function Categories() {
    return (
        <Grid sx={{ my: 1, px: 2 }} columnSpacing={5} container>
            <Grid item xs={2}>
                <Sidebar />
            </Grid>
            <Grid item xs={10}>
                <Box>
                    <Typography variant="h3" gutterBottom>
                        Categories
                    </Typography>

                    {categories.map(({ id, title }) => (
                        <Box key={id} sx={{ border: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {title}
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                <Product />
                                <Product />
                                <Product />
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
}

// main content will be, say 3 products from each category and a button that leads to ALL products of a specific cat

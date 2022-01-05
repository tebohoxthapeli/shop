import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Sidebar from "./Sidebar";
import Product from "../Product";

import { categories } from "../../utils/data";

export default function Categories() {
    return (
        <Grid sx={{ my: 1, px: 2 }} columnSpacing={2} container>
            <Grid item xs={2}>
                <Sidebar />
            </Grid>

            <Grid item xs={10}>
                <Box>
                    <Typography variant="h3" gutterBottom>
                        Categories
                    </Typography>

                    {categories.map(({ id, title, subcategories }) => (
                        <Paper key={id} sx={{ my: 3, p: 2 }} elevation={5}>
                            <Stack direction="row" sx={{ justifyContent: "space-between", pb: 1 }}>
                                <Typography variant="h6">{title}</Typography>
                                <Button>Show All</Button>
                            </Stack>

                            <Stack direction="row" spacing={4}>
                                {subcategories.map(({ products }) => {
                                    return products.map((item) => (
                                        <Product {...item} key={item.id} />
                                    ));
                                })}
                            </Stack>
                        </Paper>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
}

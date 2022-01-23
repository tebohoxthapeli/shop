import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { jacketsAndCoats } from "../../utils/data";
import Product from "../Product";

export default function AllProducts() {
    return (
        <Box sx={{ flex: 8 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Jackets and Coats
            </Typography>

            <Grid container spacing={2}>
                {jacketsAndCoats.map((item, index) => (
                    <Grid item xs={4} key={index}>
                        <Product {...item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

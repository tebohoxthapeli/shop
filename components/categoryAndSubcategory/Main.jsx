import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Product from "../Product";
import { useFilterContextValue } from "../../context/productFilterContext/FilterDataLayer";

export default function Main({ products }) {
    const { query } = useRouter();
    const [{ brands, sortBy, maxPrice }] = useFilterContextValue();
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        // filter by max price:
        let temp = products.filter(({ price }) => price <= maxPrice);

        // filter by brand:
        if (brands.length !== 0) {
            temp = temp.filter(({ brand }) => brands.includes(brand));
        }

        // sort
        switch (sortBy) {
            case "mostPopular":
                temp = temp.sort((a, b) => b.likeCount - a.likeCount);
                break;
            case "leastPopular":
                temp = temp.sort((a, b) => a.likeCount - b.likeCount);
                break;
            case "highestPrice":
                temp = temp.sort((a, b) => b.price - a.price);
                break;
            case "lowestPrice":
                temp = temp.sort((a, b) => a.price - b.price);
                break;
        }

        setFilteredProducts(temp);
    }, [sortBy, brands, maxPrice, products]);

    const getLabel = ({ subcategory, category }) => {
        return subcategory ? subcategory : category;
    };

    let renderProducts = null;
    if (filteredProducts.length > 0) {
        renderProducts = (
            <Grid container spacing={2}>
                {filteredProducts.map((product) => (
                    <Grid item xs={4} key={product._id}>
                        <Product {...product} />
                    </Grid>
                ))}
            </Grid>
        );
    } else {
        renderProducts = (
            <Typography variant="h6" color="text.secondary">
                The filter settings you have selected have yielded no results. Try different
                settings.
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>
                {getLabel(query)}: All
            </Typography>

            {renderProducts}
        </Box>
    );
}

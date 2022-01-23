import NextLink from "next/link";
// import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { CardActionArea, CardActions } from "@mui/material";

export default function Product({
    productName,
    brand,
    price,
    image,
    category,
    subcategory,
    _id,
    likes,
}) {
    return (
        <Card sx={{ maxWidth: 345, flex: 1 }}>
            <NextLink href={`/${category}/${subcategory}/${_id}`} passHref>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image={image}
                        alt={productName}
                        sx={{ objectFit: "contain" }}
                    />

                    <CardContent>
                        <Typography variant="body1" component="div">
                            {productName}
                        </Typography>

                        <Typography variant="overline" color="text.secondary">
                            {brand}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            R{price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </NextLink>

            <CardActions>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </CardActions>
        </Card>
    );
}

import NextLink from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CardMedia from "@mui/material/CardMedia";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

import { useDataLayerValue } from "../context/DataLayer";

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
    const router = useRouter();
    const [{ user }] = useDataLayerValue();
    const [isProductLiked, setIsProductLiked] = useState(false);

    useEffect(() => {
        if (user) {
            setIsProductLiked(likes.includes(user._id));
        }
    }, [user, likes]);

    const handleIsProductLikedChange = async (e) => {
        if (!user) {
            router.push(`/login?redirect=${router.asPath}`);
        } else {
            setIsProductLiked(e.target.checked);

            await axios
                .put(
                    `/api/products/${category}/${subcategory}/${_id}/like`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                )
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error:", error.message);
                    }
                });
        }
    };

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
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={handleIsProductLikedChange}
                    checked={isProductLiked}
                />
            </CardActions>
        </Card>
    );
}

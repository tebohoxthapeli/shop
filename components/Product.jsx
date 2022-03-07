import NextLink from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

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
    _id: productId,
    likes,
    likeCount,
}) {
    const [
        { user, likedProducts, hasCheckedProductComponentLikes, hasCheckedProductPageLikes },
        dispatch,
    ] = useDataLayerValue();

    const router = useRouter();
    const [isProductLiked, setIsProductLiked] = useState(false);

    // main on initial render use effect:

    useEffect(() => {
        if (user) {
            // if has checked the likes prop:
            if (hasCheckedProductComponentLikes || hasCheckedProductPageLikes) {
                if (likedProducts.has(productId)) {
                    setIsProductLiked(true);
                }
            } else {
                if (likes.includes(user._id)) {
                    setIsProductLiked(true);
                    dispatch({ type: "ADD_PRODUCT_TO_LIKED", payload: productId });
                    dispatch({ type: "SET_CHECKED_PRODUCT_COMPONENT_LIKES" });
                }
            }
        } else {
            setIsProductLiked(false);
        }
    }, [
        user,
        dispatch,
        hasCheckedProductPageLikes,
        hasCheckedProductComponentLikes,
        likedProducts,
        likes,
        productId,
    ]);

    const updateLikedProducts = () => {
        if (isProductLiked) {
            dispatch({ type: "REMOVE_PRODUCT_FROM_LIKED", payload: productId });
        } else {
            dispatch({ type: "ADD_PRODUCT_TO_LIKED", payload: productId });
        }
    };

    const updateLikeCount = () => {
        const cookieName = `${productId}-likeCount`;
        const likeCountCookie = Cookies.get(cookieName);

        // changing this product's liked state should store its like count in a cookie
        // here we're trying to determine if this has already happened since logging in

        if (likeCountCookie) {
            const parsedCookie = JSON.parse(likeCountCookie);

            // if the product is already liked, then we're trying to unlike it

            if (isProductLiked) {
                Cookies.set(cookieName, JSON.stringify(parsedCookie - 1));
            } else {
                Cookies.set(cookieName, JSON.stringify(parsedCookie + 1));
            }
        } else {
            if (isProductLiked) {
                Cookies.set(cookieName, JSON.stringify(likeCount - 1));
            } else {
                Cookies.set(cookieName, JSON.stringify(likeCount + 1));
            }
        }
    };

    const handleIsProductLikedChange = async (e) => {
        if (!user) {
            router.push(`/login?redirect=${router.asPath}`);
        } else {
            setIsProductLiked(e.target.checked);
            updateLikedProducts();
            updateLikeCount();

            await axios
                .put(
                    `/api/products/${category}/${subcategory}/${productId}/like`,
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
            <NextLink href={`/${category}/${subcategory}/${productId}`} passHref>
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
                    checkedIcon={<Favorite color="error" />}
                    onChange={handleIsProductLikedChange}
                    checked={isProductLiked}
                />
            </CardActions>
        </Card>
    );
}

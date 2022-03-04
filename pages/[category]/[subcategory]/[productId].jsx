import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ProductModel from "../../../models/Product";
import Color from "../../../components/product/Color";
import Quantity from "../../../components/product/Quantity";
import { useDataLayerValue } from "../../../context/DataLayer";
import Breadcrumbs from "../../../components/BreadCrumbs";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../../../utils/database";

export default function Product({
    product: { _id: productId, productName, brand, price, image, sizes, colours, likes, likeCount },
}) {
    const router = useRouter();
    const [{ user, likedProducts }, dispatch] = useDataLayerValue();
    const { enqueueSnackbar } = useSnackbar();

    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColour, setSelectedColour] = useState(null);
    const [isProductLiked, setIsProductLiked] = useState(false);
    const [_likeCount, setLikeCount] = useState(likeCount);

    const handleSizeChange = (e, newValue) => {
        setSize(newValue);
    };

    const handleColourChange = (colour) => {
        setSelectedColour(colour);
    };

    // const checkedViaProps = Cookies.get("checkedViaProps") ? JSON.parse(Cookies.get("checkedViaProps")) : null;
    /*
        if (user) {
            if (checkedViaProps) {
                if (likedProducts.has(productId)) {
                    // *** some logic ***
                }
            } else {
                if (likes.includes(user._id)) {
                    // *** some logic here ***
                }
            }
        }
    
    */

    // or try to use [revalidate]

    useEffect(() => {
        if (user) {
            if (likes.includes(user._id)) {
                setIsProductLiked(true);
                dispatch({ type: "ADD_PRODUCT_TO_LIKED", payload: productId });
            }
        }
    }, [user, likes, productId, dispatch]);

    useEffect(() => {
        if (isProductLiked) {
            dispatch({ type: "ADD_PRODUCT_TO_LIKED", payload: productId });
        } else {
            dispatch({ type: "REMOVE_PRODUCT_FROM_LIKED", payload: productId });
        }
    }, [isProductLiked, dispatch, productId]);

    const handleIsProductLikedChange = async (e) => {
        if (!user) {
            router.push(`/login?redirect=${router.asPath}`);
        } else {
            setIsProductLiked(e.target.checked);

            if (isProductLiked) {
                setLikeCount(_likeCount - 1);
            } else {
                setLikeCount(_likeCount + 1);
            }

            const { category, subcategory } = router.query;

            const likeProductResponse = await axios
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

            if (likeProductResponse) console.log(likeProductResponse.data);
        }
    };

    const handleQuantityChange = (operator) => {
        if (operator === "subtract") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            quantity < 10 && setQuantity(quantity + 1);
        }
    };

    const addToShoppingBag = async () => {
        if (!user) {
            router.push(`/login?redirect=${router.asPath}`);
        } else {
            const product = {
                _id: `${productId}-${size}-${selectedColour}`,
                productName,
                brand,
                size,
                image,
                price,
                quantity,
                colour: selectedColour,
            };

            const errors = [];
            !size && errors.push("Size is required.");
            !selectedColour && errors.push("Colour is required.");

            if (errors.length > 0) {
                errors.forEach((message) => {
                    enqueueSnackbar(message, {
                        variant: "error",
                    });
                });
            } else {
                const addToBagResponse = await axios
                    .put("/api/bag/add", product, {
                        headers: { Authorization: `Bearer ${user.token}` },
                    })
                    .catch((error) => {
                        if (error.response) {
                            console.log(error.response.data);
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log("Error:", error.message);
                        }
                    });

                if (addToBagResponse) {
                    dispatch({ type: "BAG_UPDATE", payload: addToBagResponse.data });
                    Cookies.set("bag", JSON.stringify(addToBagResponse.data));

                    enqueueSnackbar("Product successfully added to bag", {
                        variant: "success",
                    });

                    setSize(null);
                    setQuantity(1);
                    setSelectedColour(null);
                }
            }
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Breadcrumbs />

            <Stack direction="row" spacing={4}>
                <Box sx={{ position: "relative", height: "600px", width: "450px" }}>
                    <Image src={image} alt={image} layout="fill" objectFit="cover" />
                </Box>

                <Stack spacing={4}>
                    <Box>
                        <Typography variant="h5">{productName}</Typography>

                        <Typography variant="body1" color="text.secondary">
                            {brand}
                        </Typography>

                        <Typography variant="h4">R{price}</Typography>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <Typography variant="body2" component="span" color="error">
                                *{" "}
                            </Typography>
                            Select a size:
                        </Typography>

                        <ToggleButtonGroup
                            value={size}
                            onChange={handleSizeChange}
                            color="primary"
                            size="small"
                            exclusive
                            sx={{ display: "flex" }}
                        >
                            {sizes.map((size) => (
                                <ToggleButton value={size} key={size} sx={{ flex: 1 }}>
                                    {size}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <Typography variant="body2" component="span" color="error">
                                *{" "}
                            </Typography>
                            Select a colour:
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            {colours.map((colour) => (
                                <Color
                                    colour={colour}
                                    handleColourChange={handleColourChange}
                                    selectedColour={selectedColour}
                                    key={colour}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Quantity:
                        </Typography>

                        <Quantity handleQuantityChange={handleQuantityChange} quantity={quantity} />
                    </Box>

                    <Button
                        onClick={addToShoppingBag}
                        variant="contained"
                        startIcon={<ShoppingBagIcon />}
                        sx={{ maxWidth: "15rem" }}
                    >
                        Add to shopping bag
                    </Button>

                    <Divider />

                    <Paper sx={{ p: 2 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Do you like this product?:
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite color="error" />}
                                onChange={handleIsProductLikedChange}
                                checked={isProductLiked}
                            />

                            <Typography variant="body2" color="text.secondary">
                                {isProductLiked
                                    ? "You have liked this product"
                                    : "You have not liked this product"}
                            </Typography>
                        </Box>
                    </Paper>

                    <Typography variant="overline">
                        total number of likes for this product:{" "}
                        <Typography variant="body1" component="span">
                            {_likeCount}
                        </Typography>
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}

export async function getStaticPaths() {
    try {
        await dbConnect();
        const products = convertBsonToObject(await ProductModel.find({}));
        await dbDisconnect();

        return {
            paths: products.map(({ _id, category, subcategory }) => {
                return { params: { productId: _id, category, subcategory } };
            }),
            fallback: false,
        };
    } catch (err) {
        console.log("Error:", err.message);
        return;
    }
}

export async function getStaticProps({ params: { productId } }) {
    try {
        await dbConnect();
        const product = convertBsonToObject(await ProductModel.findById(productId));
        await dbDisconnect();

        return {
            props: { product },
        };
    } catch (err) {
        console.log("Error:", err.message);
        return;
    }
}

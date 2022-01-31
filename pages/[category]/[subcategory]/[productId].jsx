import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ProductModel from "../../../models/Product";
import Color from "../../../components/product/Color";
import Quantity from "../../../components/product/Quantity";
import { useDataLayerValue } from "../../../context/DataLayer";
import Breadcrumbs from "../../../components/BreadCrumbs";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../../../utils/database";

// change the API to account for the same product, but in a different size

export default function Product({
    product: { _id, productName, brand, price, image, sizes, colours }, // left out likes
}) {
    const [{ user }, dispatch] = useDataLayerValue();
    const { enqueueSnackbar } = useSnackbar();

    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColour, setSelectedColour] = useState(null);
    const [isProductLiked, setIsProductLiked] = useState(null);

    const handleSizeChange = (e, newValue) => {
        setSize(newValue);
    };

    const handleColourChange = (colour) => {
        setSelectedColour(colour);
    };

    const handleQuantityChange = (operator) => {
        if (operator === "subtract") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            quantity < 10 && setQuantity(quantity + 1);
        }
    };

    const addToShoppingBag = async () => {
        const product = {
            _id,
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
            const editBagResponse = await axios
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

            if (editBagResponse) {
                dispatch({ type: "BAG_UPDATE", payload: editBagResponse.data });

                enqueueSnackbar("Product successfully added to bag", {
                    variant: "success",
                });

                setSize(null);
                setQuantity(1);
                setSelectedColour(null);
            }
        }
    };

    const handleProductLikedChange = (e, newValue) => {
        setIsProductLiked(newValue);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Breadcrumbs />

            <Stack direction="row" spacing={4}>
                <Box>
                    <Image src={image} alt={image} height={700} width={500} />
                </Box>

                <Stack spacing={5}>
                    <Box>
                        <Typography variant="h5">{productName}</Typography>

                        <Typography variant="body1" color="text.secondary">
                            {brand}
                        </Typography>

                        <Typography variant="h3">R{price}</Typography>
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

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Do you like this product?:
                        </Typography>

                        <ToggleButtonGroup
                            color="primary"
                            value={isProductLiked}
                            exclusive
                            onChange={handleProductLikedChange}
                            size="small"
                            sx={{ display: "flex", maxWidth: "15rem" }}
                        >
                            <ToggleButton value="y" sx={{ flex: 1 }}>
                                Yes
                            </ToggleButton>

                            <ToggleButton value="n" sx={{ flex: 1 }}>
                                No
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
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

import { useState } from "react";
import Image from "next/image";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ProductModel from "../../../models/Product";
import Color from "../../../components/product/Color";
import Quantity from "../../../components/product/Quantity";
import Breadcrumbs from "../../../components/BreadCrumbs";
import { dbConnect, dbDisconnect, convertBsonToObject } from "../../../utils/database";

export default function Product({
    product: { productName, brand, price, image, sizes, colours, likes },
}) {
    const [size, setSize] = useState(null);
    const handleChange = (event, newSize) => {
        setSize(newSize);
    };

    const [likeProduct, setLikeProduct] = useState(null);
    const handleLikeProduct = (event, newLikeProduct) => {
        setLikeProduct(newLikeProduct);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Breadcrumbs />

            <Stack direction="row" spacing={4}>
                <Box>
                    <Image src={image} alt={image} height={900} width={600} />
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
                            Select a size:
                        </Typography>

                        <ToggleButtonGroup
                            color="primary"
                            value={size}
                            exclusive
                            onChange={handleChange}
                        >
                            {sizes.map((size) => (
                                <ToggleButton value={size} key={size}>
                                    {size}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Select a colour:
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            {colours.map((colour) => (
                                <Color color={colour} key={colour} />
                            ))}
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Quantity:
                        </Typography>

                        <Quantity />
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<ShoppingBagIcon />}
                        // sx={{ mb: 10, mt: 2 }}
                    >
                        Add to shopping bag
                    </Button>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Do you like this product?:
                        </Typography>

                        <ToggleButtonGroup
                            color="primary"
                            value={likeProduct}
                            exclusive
                            onChange={handleLikeProduct}
                        >
                            <ToggleButton value="y">Yes</ToggleButton>
                            <ToggleButton value="n">No</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
}

export async function getStaticProps({ params: { productId } }) {
    try {
        await dbConnect();
        const product = convertBsonToObject(await ProductModel.findById(productId));
        await dbDisconnect();

        if (!product) {
            return {
                notFound: true,
            };
        }

        return {
            props: { product },
        };
    } catch (err) {
        console.log("Error:", err.message);
        return;
    }
}

export async function getStaticPaths() {}

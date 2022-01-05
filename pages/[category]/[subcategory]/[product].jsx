import { useState } from "react";
import Image from "next/image";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import Breadcrumbs from "../../../components/BreadCrumbs";
import Color from "../../../components/productPage/Color";
import Quantity from "../../../components/productPage/Quantity";

const colors = ["red", "blue", "yellow"];

export default function Product() {
    const [alignment, setAlignment] = useState("m");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [likeProduct, setLikeProduct] = useState(null);

    const handleLikeProduct = (event, newLikeProduct) => {
        setLikeProduct(newLikeProduct);
    };

    return (
        <Box>
            <Breadcrumbs />

            <Stack direction="row" spacing={2} sx={{ p: 4, justifyContent: "center" }}>
                <Box>
                    <Image
                        src="/images/shirts/casual shirt.jpg"
                        alt="product image"
                        height={900}
                        width={600}
                    />
                </Box>

                <Box>
                    <Typography variant="h4">Tbar art t-shirt</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Cotton On
                    </Typography>

                    <Typography variant="h3" sx={{ my: 2 }}>
                        R209
                    </Typography>

                    <Box sx={{ mb: 8, mt: 6 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Select a size:
                        </Typography>

                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                        >
                            <ToggleButton value="xs">XS</ToggleButton>
                            <ToggleButton value="s">S</ToggleButton>
                            <ToggleButton value="m">M</ToggleButton>
                            <ToggleButton value="l">L</ToggleButton>
                            <ToggleButton value="xl">XL</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <Box sx={{ mb: 8 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Select a colour:
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            {colors.map((color, index) => (
                                <Color key={index} color={color} />
                            ))}
                        </Stack>
                    </Box>

                    <Box sx={{ mb: 8 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Quantity:
                        </Typography>

                        <Quantity />
                    </Box>

                    <Button
                        variant="contained"
                        sx={{ mb: 10, mt: 2 }}
                        startIcon={<ShoppingBagIcon />}
                    >
                        Add to shopping bag
                    </Button>

                    <Box sx={{ mb: 8 }}>
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
                </Box>
            </Stack>
        </Box>
    );
}

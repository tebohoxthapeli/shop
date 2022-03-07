import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDataLayerValue } from "../context/DataLayer";
import Breadcrumbs from "../components/BreadCrumbs";

const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ShoppingBag() {
    const router = useRouter();

    const [{ user, bag }, dispatch] = useDataLayerValue();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!bag) {
            router.replace("/");
        }
        // eslint-disable-next-line
    }, [bag]);

    const handleQuantityChange = async (e, _id) => {
        setLoading(true);

        const editBagResponse = await axios
            .put(
                `/api/bag/edit?productId=${_id}`,
                { quantity: e.target.value },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .catch((error) => {
                setLoading(false);

                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error:", error.message);
                }
            });

        if (editBagResponse) {
            setLoading(false);

            dispatch({ type: "BAG_UPDATE", payload: editBagResponse.data });
            Cookies.set("bag", JSON.stringify(editBagResponse.data));
        }
    };

    const handleRemoveProduct = async (_id) => {
        setLoading(true);

        const removeProductResponse = await axios
            .put(
                `/api/bag/remove?productId=${_id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            .catch((error) => {
                setLoading(false);

                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error:", error.message);
                }
            });

        if (removeProductResponse) {
            setLoading(false);

            dispatch({ type: "BAG_UPDATE", payload: removeProductResponse.data });
            Cookies.set("bag", JSON.stringify(removeProductResponse.data));
        }
    };

    let renderSpinner = null;
    if (loading) {
        renderSpinner = <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />;
    }

    let renderBag = null;
    if (bag) {
        if (bag.products.length > 0) {
            renderBag = (
                <Box sx={{ display: "flex", gap: 10 }}>
                    <Box sx={{ flex: 8 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {bag.products.map(
                                        ({
                                            _id,
                                            image,
                                            productName,
                                            size,
                                            colour,
                                            brand,
                                            total,
                                            quantity,
                                            price,
                                        }) => (
                                            <TableRow
                                                sx={{
                                                    "&:last-child td, &:last-child th": {
                                                        border: 0,
                                                    },
                                                }}
                                                key={_id}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {/* Parent box -> 2 children */}
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: 1,
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {/* Image box */}
                                                        <Box
                                                            sx={{
                                                                height: "15rem",
                                                                position: "relative",
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <Image
                                                                src={image}
                                                                alt={image}
                                                                layout="fill"
                                                                objectFit="contain"
                                                            />
                                                        </Box>

                                                        {/* Product details box */}
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography variant="body2">
                                                                Name: {productName}
                                                            </Typography>

                                                            <Typography variant="body2">
                                                                Brand: {brand}
                                                            </Typography>

                                                            <Typography variant="body2">
                                                                Size: {size}
                                                            </Typography>

                                                            <Typography variant="body2">
                                                                Colour: {colour}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>

                                                <TableCell align="right" sx={{ width: "5rem" }}>
                                                    R{price}
                                                </TableCell>

                                                <TableCell align="right" sx={{ width: "5rem" }}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <Select
                                                            value={quantity}
                                                            onChange={(e) => {
                                                                handleQuantityChange(e, _id);
                                                            }}
                                                        >
                                                            {quantityOptions.map((option) => (
                                                                <MenuItem
                                                                    value={option}
                                                                    key={option}
                                                                >
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell align="right" sx={{ width: "5rem" }}>
                                                    R{total}
                                                </TableCell>

                                                <TableCell align="right" sx={{ width: "5rem" }}>
                                                    <IconButton
                                                        onClick={() => handleRemoveProduct(_id)}
                                                    >
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Paper
                        sx={{
                            flex: 2,
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                            height: "15rem",
                        }}
                    >
                        <Typography variant="h5"> Order Summary</Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Typography variant="h6"> Subtotal</Typography>
                            <Typography variant="h4">
                                {bag.products.reduce((subtotal, { total }) => subtotal + total, 0)}
                            </Typography>
                        </Box>

                        <Button variant="contained" sx={{ width: "100%" }}>
                            Checkout
                        </Button>
                    </Paper>
                </Box>
            );
        } else {
            renderBag = <Typography>There are currently no products in your bag</Typography>;
        }
    }

    return (
        <Box sx={{ p: 4 }}>
            <Breadcrumbs />

            <Typography variant="h4" sx={{ mb: 4 }}>
                Shopping bag
            </Typography>

            {renderBag}
            {renderSpinner}
        </Box>
    );
}

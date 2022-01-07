import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import Image from "next/image";

import Breadcrumbs from "../components/BreadCrumbs";

// consider adding colour

function createData(item, price, quantity, total) {
    return { item, price, quantity, total };
}

const rows = [createData("Shirt", 100, 2, 200), createData("Pants", 50, 1, 50)];

export default function ShoppingBag() {
    return (
        <Box>
            <Breadcrumbs />

            <Box sx={{ p: 4, display: "flex", gap: 10 }}>
                <Box sx={{ flex: 8 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Shopping bag
                    </Typography>

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
                                {rows.map(({ item, price, quantity, total }) => (
                                    <TableRow
                                        key={item}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        height: "15rem",
                                                        position: "relative",
                                                        flex: 1,
                                                    }}
                                                >
                                                    <Image
                                                        src="/images/bottoms/shorts.jpg"
                                                        alt="product-image"
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </Box>

                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="body2">
                                                        Name: {item}
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        Brand: Versace
                                                    </Typography>

                                                    <Typography variant="body2">Size: M</Typography>

                                                    <Typography variant="body2">
                                                        Colour: Ocean Blue
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        <TableCell align="right" sx={{ width: "5rem" }}>
                                            R{price}
                                        </TableCell>

                                        <TableCell align="right" sx={{ width: "5rem" }}>
                                            {quantity}
                                        </TableCell>

                                        <TableCell align="right" sx={{ width: "5rem" }}>
                                            R{total}
                                        </TableCell>

                                        <TableCell align="right" sx={{ width: "5rem" }}>
                                            <IconButton>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                        <Typography variant="h4"> R90</Typography>
                    </Box>

                    <Button variant="contained" sx={{ width: "100%" }}>
                        Checkout
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
}

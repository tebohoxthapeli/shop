import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

const style = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export default function Quantity() {
    const [quantity, setQuantity] = useState(0);

    const handleClick = (operator) => {
        if (operator === "sub") {
            if (quantity === 0) return;
            setQuantity(quantity - 1);
        } else {
            if (quantity === 10) return;
            setQuantity(quantity + 1);
        }
    };

    return (
        <Paper
            sx={{
                width: "9rem",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box sx={style}>
                <IconButton onClick={() => handleClick("sub")}>
                    <RemoveIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeft: "1px solid grey",
                    borderRight: "1px solid grey",
                }}
            >
                <Typography variant="h6">{quantity}</Typography>
            </Box>

            <Box sx={style}>
                <IconButton onClick={() => handleClick("add")}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Paper>
    );
}

{
    /* <IconButton>
                    <RemoveIcon />
                </IconButton>

                <Typography variant="h6" sx={{ width: "2rem" }}>
                    0
                </Typography>

                <IconButton>
                    <AddIcon />
                </IconButton> */
}

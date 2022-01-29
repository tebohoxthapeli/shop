import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";

const style = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export default function Quantity({ handleQuantityChange, quantity }) {
    return (
        <Paper
            sx={{
                width: "15rem",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box sx={style}>
                <IconButton onClick={() => handleQuantityChange("subtract")} size="small">
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
                <Typography variant="body1">{quantity}</Typography>
            </Box>

            <Box sx={style}>
                <IconButton onClick={() => handleQuantityChange("add")} size="small">
                    <AddIcon />
                </IconButton>
            </Box>
        </Paper>
    );
}

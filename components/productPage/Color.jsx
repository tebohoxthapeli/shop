import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Color({ color }) {
    return (
        <Box
            sx={{
                width: "4rem",
                pt: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px solid",
                borderRadius: "5px",
                borderColor: "transparent",
                cursor: "pointer",

                "&:hover": {
                    borderColor: color,
                },
            }}
        >
            <Box
                sx={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    backgroundColor: color,
                }}
            />
            <Typography variant="overline">{color}</Typography>
        </Box>
    );
}

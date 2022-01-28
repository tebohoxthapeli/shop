import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Color({ colour, handleColourChange, selectedColour }) {
    return (
        <Box
            onClick={() => handleColourChange(colour)}
            sx={{
                width: "4rem",
                pt: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "0.1rem solid",
                borderRadius: "0.25rem",
                borderColor: "transparent",
                cursor: "pointer",
                background: selectedColour === colour ? "rgba(255,255,255,0.2)" : "transparent",

                "&:hover": {
                    borderColor: "rgb(255,255,255,0.2)",
                },
            }}
        >
            <Box
                sx={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    backgroundColor: colour,
                    boxShadow:
                        selectedColour === colour ? "0 0 0 2px rgba(255,255,255,0.5)" : "none",
                }}
            />
            <Typography variant="overline">{colour}</Typography>
        </Box>
    );
}

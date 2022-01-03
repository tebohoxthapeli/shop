import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 2,
                backgroundColor: "common.black",
            }}
        >
            <Typography variant="overline">© Copyright FaucetLeak. All Rights Reserved.</Typography>

            <Stack
                direction="row"
                spacing={4}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Typography variant="caption">Privacy & Cookie Policy</Typography>
                <Typography variant="caption">Terms & Conditions</Typography>
                <Typography variant="caption">Copyright Notice</Typography>
            </Stack>
        </Box>
    );
}

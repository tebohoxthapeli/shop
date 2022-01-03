import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Newsletter() {
    return (
        <Container maxWidth="sm" sx={{ mb: 3 }}>
            <Stack spacing={2} sx={{ alignItems: "center", p: 1 }}>
                <Typography variant="h6">Sign up for FaucetLeak style news</Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                        id="email-form"
                        label="Enter your email"
                        variant="outlined"
                        size="small"
                    />
                    <Button variant="contained">Sign up</Button>
                </Box>
            </Stack>
        </Container>
    );
}

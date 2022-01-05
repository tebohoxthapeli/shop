import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginRegister({ page }) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Stack direction="row" sx={{ my: 4 }}>
            <Box sx={{ flex: 1, position: "relative", maxHeight: "100vh" }}>
                <Image
                    src={
                        page === "register"
                            ? "/illustrations/DrawKit-Vector-Illustration-ecommerce-01.svg"
                            : "/illustrations/DrawKit-Vector-Illustration-ecommerce-09.svg"
                    }
                    alt="register-illustration"
                    layout="fill"
                    objectFit="contain"
                />
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 4,
                }}
            >
                <Typography variant="h4">
                    {page === "register" ? "Create a new account" : "Login to your account"}
                </Typography>

                <Stack spacing={3} sx={{ width: "60%" }}>
                    {page === "register" && <TextField label="Name" />}
                    <TextField label="Email address" type="email" />

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password-input">Password</InputLabel>
                        <OutlinedInput
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    {page === "register" && (
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Do you accept our terms and conditions?"
                        />
                    )}

                    <Button variant="contained">Continue</Button>

                    {page === "login" && (
                        <Typography variant="body2">
                            Click{" "}
                            <Link href="#" underline="hover">
                                here
                            </Link>{" "}
                            if you have forgotten your password.
                        </Typography>
                    )}

                    <NextLink href={page === "register" ? "/login" : "/register"} passHref>
                        <Button variant="outlined">
                            {page === "register"
                                ? "Already have an account? Login"
                                : "Don't have an account? Create one"}
                        </Button>
                    </NextLink>
                </Stack>
            </Box>
        </Stack>
    );
}

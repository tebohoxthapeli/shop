import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Formik, Form, Field } from "formik";
import { object, string } from "yup";

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = object({
    email: string().required("Enter your email address."),
    password: string().required("Enter your password."),
});

function onSubmit(values) {
    console.log("form values", values);
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "85vh",
                px: "2rem",
                gap: "2rem",
            }}
        >
            <Box sx={{ flex: 1, position: "relative" }}>
                <Image
                    src="/illustrations/DrawKit-Vector-Illustration-ecommerce-09.svg"
                    alt="llustration"
                    layout="fill"
                    objectFit="contain"
                />
            </Box>

            <Stack spacing={3} sx={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Login to your account
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ dirty, isValid }) => {
                        return (
                            <Stack component={Form} spacing={3} sx={{ width: "60%" }}>
                                <Field name="email">
                                    {({ field, meta: { error, touched } }) => {
                                        return (
                                            <TextField
                                                {...field}
                                                type="email"
                                                label="Email address"
                                                error={touched && error ? true : false}
                                                helperText={touched && error}
                                                inputProps={{ maxLength: 100 }}
                                            />
                                        );
                                    }}
                                </Field>

                                <Field name="password">
                                    {({ field, meta: { error, touched } }) => {
                                        return (
                                            <TextField
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                label="Password"
                                                error={touched && error ? true : false}
                                                helperText={touched && error}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={
                                                                    handleMouseDownPassword
                                                                }
                                                            >
                                                                {showPassword ? (
                                                                    <VisibilityOff />
                                                                ) : (
                                                                    <Visibility />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    maxLength: 50,
                                                }}
                                            />
                                        );
                                    }}
                                </Field>

                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!(dirty && isValid)}
                                >
                                    Login
                                </Button>
                            </Stack>
                        );
                    }}
                </Formik>

                <Typography variant="body2">
                    Click{" "}
                    <Link href="#" underline="hover">
                        here
                    </Link>{" "}
                    if you have forgotten your password.
                </Typography>

                <NextLink href="/register" passHref>
                    <Button variant="outlined">{"Don't have an account? Create one"}</Button>
                </NextLink>
            </Stack>
        </Box>
    );
}

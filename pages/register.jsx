import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, boolean } from "yup";

const initialValues = {
    email: "",
    password: "",
    username: "",
    termsAndConditions: false,
};

const validationSchema = object({
    email: string().email("Invalid email address format entered.").required("Enter email address."),
    password: string()
        .required("Enter password.")
        .matches(
            /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).*/,
            "Uppercase letter, lowercase letter, number and special character (eg. $#@!*...) required."
        )
        .min(8, "Password should be at least ${min} characters long."),
    username: string()
        .required("Enter username.")
        .matches(/^\p{L}+([' -]\p{L}+.?)*(, \p{L}+.?)*$/u, "Invalid username format entered.")
        .min(2, "Username should be at least ${min} characters long."),
    termsAndConditions: boolean().isTrue(
        "To continue using this service, accept the terms and conditions."
    ),
});

function onSubmit(values) {
    console.log("form values", values);
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ display: "flex", height: "100vh", px: "2rem", gap: "2rem" }}>
            <Box sx={{ flex: 1, position: "relative" }}>
                <Image
                    src="/illustrations/DrawKit-Vector-Illustration-ecommerce-01.svg"
                    alt="illustration"
                    layout="fill"
                    objectFit="contain"
                />
            </Box>

            <Stack
                spacing={3}
                sx={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Create a new account
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ dirty, isValid }) => {
                        return (
                            <Stack component={Form} spacing={3} sx={{ width: "60%" }}>
                                <Field name="username">
                                    {({ field, meta: { error, touched } }) => {
                                        return (
                                            <TextField
                                                {...field}
                                                type="text"
                                                label="Username"
                                                error={touched && error ? true : false}
                                                helperText={touched && error}
                                                inputProps={{ maxLength: 50 }}
                                            />
                                        );
                                    }}
                                </Field>

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

                                <Field name="termsAndConditions" type="checkbox">
                                    {({ field }) => {
                                        return (
                                            <>
                                                <FormControlLabel
                                                    control={<Checkbox {...field} />}
                                                    label="Do you accept our terms and conditions?"
                                                />
                                                <ErrorMessage name="termsAndConditions">
                                                    {(errorMessage) => (
                                                        <p
                                                            style={{
                                                                color: "#ff3333",
                                                                fontSize: "12px",
                                                                margin: 0,
                                                            }}
                                                        >
                                                            {errorMessage}
                                                        </p>
                                                    )}
                                                </ErrorMessage>
                                            </>
                                        );
                                    }}
                                </Field>

                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!(dirty && isValid)}
                                >
                                    Register
                                </Button>
                            </Stack>
                        );
                    }}
                </Formik>

                <NextLink href="/login" passHref>
                    <Button variant="outlined">Already have an account? Login</Button>
                </NextLink>
            </Stack>
        </Box>
    );
}

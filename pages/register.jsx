import axios from "axios";
import NextLink from "next/link";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import { object, string, boolean } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { getError } from "../utils/error";
import { useDataLayerValue } from "../context/DataLayer";

const initialValues = {
    username: "",
    email: "",
    password: "",
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

export default function Register() {
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [{ user }, dispatch] = useDataLayerValue();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) router.replace("/");
        // eslint-disable-next-line
    }, [user]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (values) => {
        setLoading(true);
        closeSnackbar();
        delete values.termsAndConditions;

        const registerUserResponse = await axios
            .post("/api/users/register", values)
            .catch((error) => {
                setLoading(false);

                enqueueSnackbar(getError(error), {
                    variant: "error",
                });
            });

        if (registerUserResponse) {
            const userInfo = registerUserResponse.data;

            const getBagResponse = await axios
                .get("api/bag", {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                })
                .catch((error) => {
                    setLoading(false);

                    if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error:", error.message);
                    }
                });

            if (getBagResponse) {
                setLoading(false);
                dispatch({ type: "BAG_UPDATE", payload: getBagResponse.data });
                dispatch({ type: "USER_LOGIN", payload: userInfo });
            }
        }
    };

    let renderSpinner = null;
    if (loading) {
        renderSpinner = (
            <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress />
            </Backdrop>
        );
    }

    return (
        <Box sx={{ display: "flex", height: "100vh", px: "2rem", gap: "2rem" }}>
            <Box sx={{ flex: 1, position: "relative" }}>
                <Image
                    src="/images/illustrations/DrawKit-Vector-Illustration-ecommerce-01.svg"
                    alt="illustration"
                    layout="fill"
                    objectFit="contain"
                    priority
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
                                                spellCheck={false}
                                                error={touched && error ? true : false}
                                                helperText={touched && error}
                                                inputProps={{ maxLength: 50 }}
                                                autoFocus
                                                autoComplete="off"
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
                                                autoComplete="off"
                                            />
                                        );
                                    }}
                                </Field>

                                <Field name="password">
                                    {({ field, meta: { error, touched } }) => {
                                        return (
                                            <TextField
                                                {...field}
                                                autoComplete="off"
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
            {renderSpinner}
        </Box>
    );
}

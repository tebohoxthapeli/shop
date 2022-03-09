import axios from "axios";
import NextLink from "next/link";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import { object, string } from "yup";
import { Formik, Form, Field } from "formik";

import { getError } from "../utils/error";
import { useDataLayerValue } from "../context/DataLayer";

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = object({
    email: string()
        .email("Invalid email address format entered.")
        .required("Enter your email address."),
    password: string().required("Enter your password."),
});

export default function Login() {
    const router = useRouter();
    const { redirect } = router.query;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [{ user }, dispatch] = useDataLayerValue();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) router.replace(redirect || "/");
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        redirect &&
            enqueueSnackbar("Please log in first.", {
                variant: "info",
                autoHideDuration: 10000,
            });
    }, [redirect, enqueueSnackbar]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (values) => {
        closeSnackbar();
        setLoading(true);

        const loginUserResponse = await axios.post("/api/users/login", values).catch((error) => {
            setLoading(false);

            enqueueSnackbar(getError(error), {
                variant: "error",
            });
        });

        if (loginUserResponse) {
            const userInfo = loginUserResponse.data;

            const getUserBagResponse = await axios
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

            if (getUserBagResponse) {
                setLoading(false);
                dispatch({ type: "BAG_UPDATE", payload: getUserBagResponse.data });
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
                    src="/images/illustrations/DrawKit-Vector-Illustration-ecommerce-09.svg"
                    alt="llustration"
                    layout="fill"
                    objectFit="contain"
                    priority
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
                                                autoFocus
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
            {renderSpinner}
        </Box>
    );
}

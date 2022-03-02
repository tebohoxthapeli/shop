import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDataLayerValue } from "../context/DataLayer";
import axios from "axios";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { object, string } from "yup";
import { Formik, Form, Field } from "formik";
import { getError } from "../utils/error";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BreadCrumbs from "../components/BreadCrumbs";

const validationSchema = object({
    email: string().email("Invalid email address format entered.").required("Enter email address."),
    username: string()
        .required("Enter username.")
        .matches(/^\p{L}+([' -]\p{L}+.?)*(, \p{L}+.?)*$/u, "Invalid username format entered.")
        .min(2, "Username should be at least ${min} characters long."),
});

export default function Profile() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const [{ user }, dispatch] = useDataLayerValue();
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        if (!user) {
            router.replace("/");
        } else {
            const { username, email } = user;

            setInitialValues({
                username,
                email,
            });
        }
        // eslint-disable-next-line
    }, [user]);

    const onSubmit = async (values) => {
        closeSnackbar();
        const editProfileResponse = await axios
            .put(`/api/users/${user._id}/edit`, values, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .catch((error) => {
                enqueueSnackbar(getError(error), {
                    variant: "error",
                });
            });

        if (editProfileResponse) {
            enqueueSnackbar("Profile details changed successfully.", { variant: "success" });
            dispatch({ type: "USER_LOGIN", payload: editProfileResponse.data });
            Cookies.set("user", JSON.stringify(editProfileResponse.data));
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <BreadCrumbs />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Paper
                    sx={{
                        p: 4,
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 4 }}>
                        Edit your profile
                    </Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        enableReinitialize
                    >
                        {(formikProps) => {
                            const { isValid, dirty } = formikProps;

                            return (
                                <Stack component={Form} spacing={3} sx={{ width: "100%" }}>
                                    <Field name="username">
                                        {(fieldProps) => {
                                            const { field, meta } = fieldProps;
                                            const { error, touched } = meta;

                                            return (
                                                <TextField
                                                    {...field}
                                                    type="text"
                                                    label="Username"
                                                    spellCheck={false}
                                                    autoComplete="off"
                                                    error={touched && error ? true : false}
                                                    helperText={touched && error}
                                                    inputProps={{ maxLength: 50 }}
                                                />
                                            );
                                        }}
                                    </Field>

                                    <Field name="email">
                                        {(fieldProps) => {
                                            const { field, meta } = fieldProps;
                                            const { error, touched } = meta;

                                            return (
                                                <TextField
                                                    {...field}
                                                    type="email"
                                                    label="Email Address"
                                                    autoComplete="off"
                                                    error={touched && error ? true : false}
                                                    helperText={touched && error}
                                                    inputProps={{ maxLength: 100 }}
                                                />
                                            );
                                        }}
                                    </Field>

                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={!(dirty && isValid)}
                                    >
                                        Confirm profile details
                                    </Button>
                                </Stack>
                            );
                        }}
                    </Formik>
                </Paper>
            </Box>
        </Box>
    );
}

import axios from "axios";
import { useSnackbar } from "notistack";
import { object, string } from "yup";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import { getError } from "../../utils/error";
import { useDataLayerValue } from "../../context/DataLayer";

const validationSchema = object({
    email: string().email("Invalid email address format entered.").required("Enter email address."),
    username: string()
        .required("Enter username.")
        .matches(/^\p{L}+([' -]\p{L}+.?)*(, \p{L}+.?)*$/u, "Invalid username format entered.")
        .min(2, "Username should be at least ${min} characters long."),
});

export default function Main({ initialValues, user }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDataLayerValue()[1];

    const [loading, setLoading] = useState(false);

    const onSubmit = async (values) => {
        setLoading(true);
        closeSnackbar();

        const editProfileResponse = await axios
            .put(`/api/users/${user._id}/edit`, values, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .catch((error) => {
                setLoading(false);

                enqueueSnackbar(getError(error), {
                    variant: "error",
                });
            });

        if (editProfileResponse) {
            setLoading(false);

            enqueueSnackbar("Profile details changed successfully.", { variant: "success" });
            dispatch({ type: "USER_LOGIN", payload: editProfileResponse.data });
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
        <Stack
            component={Paper}
            sx={{
                p: 4,
                minWidth: "40rem",
                alignItems: "center",
                position: "relative",
            }}
        >
            {renderSpinner}
            <Typography variant="h5" sx={{ mb: 4 }}>
                Change your username and email address
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
                                            autoFocus
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
                                Confirm changes
                            </Button>
                        </Stack>
                    );
                }}
            </Formik>
        </Stack>
    );
}

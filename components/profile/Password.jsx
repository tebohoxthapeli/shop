import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { object, string } from "yup";
import { Formik, Form, Field } from "formik";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import { useDataLayerValue } from "../../context/DataLayer";
import { getError } from "../../utils/error";

const validationSchema = object({
    oldPassword: string().required("Enter your current password."),
    newPassword: string()
        .required("Enter a new password.")
        .matches(
            /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).*/,
            "Uppercase letter, lowercase letter, number and special character (eg. $#@!*...) required."
        )
        .min(8, "Password should be at least ${min} characters long."),
});

const initialValues = {
    oldPassword: "",
    newPassword: "",
};

export default function Password({ user }) {
    const dispatch = useDataLayerValue()[1];
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (values) => {
        setLoading(true);
        closeSnackbar();

        const editPasswordResponse = await axios
            .put(`/api/users/${user._id}/changePassword`, values, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .catch((error) => {
                setLoading(false);

                enqueueSnackbar(getError(error), {
                    variant: "error",
                });
            });

        if (editPasswordResponse) {
            setLoading(false);

            enqueueSnackbar("Password changed successfully.", {
                variant: "success",
            });

            values.oldPassword = "";
            values.newPassword = "";

            const newUserDetails = editPasswordResponse.data;
            dispatch({ type: "USER_LOGIN", payload: newUserDetails });
            Cookies.set("user", JSON.stringify(newUserDetails));
        }
    };

    let renderSpinner = null;
    if (loading) {
        renderSpinner = (
            <CircularProgress
                color="warning"
                sx={{ position: "absolute", top: "50%", left: "50%" }}
            />
        );
    }

    return (
        <Stack
            as={Paper}
            sx={{ p: 4, minWidth: "40rem", alignItems: "center", position: "relative" }}
        >
            {renderSpinner}
            <Typography variant="h5" sx={{ mb: 4 }}>
                Change your password
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ dirty, isValid }) => {
                    return (
                        <Stack component={Form} spacing={3} sx={{ width: "100%" }}>
                            <Field name="oldPassword">
                                {({ field, meta: { error, touched } }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            autoComplete="off"
                                            color="warning"
                                            type={showOldPassword ? "text" : "password"}
                                            label="Current Password"
                                            error={touched && error ? true : false}
                                            helperText={touched && error}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onMouseDown={handleMouseDownPassword}
                                                            onClick={handleShowOldPassword}
                                                        >
                                                            {showOldPassword ? (
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

                            <Field name="newPassword">
                                {({ field, meta: { error, touched } }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            autoComplete="off"
                                            color="warning"
                                            type={showNewPassword ? "text" : "password"}
                                            label="New Password"
                                            error={touched && error ? true : false}
                                            helperText={touched && error}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onMouseDown={handleMouseDownPassword}
                                                            onClick={handleShowNewPassword}
                                                        >
                                                            {showNewPassword ? (
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
                                color="warning"
                                variant="contained"
                                type="submit"
                                disabled={!(dirty && isValid)}
                            >
                                Confirm password change
                            </Button>
                        </Stack>
                    );
                }}
            </Formik>
        </Stack>
    );
}

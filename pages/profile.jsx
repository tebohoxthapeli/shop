import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

import Main from "../components/profile/Main";
import Password from "../components/profile/Password";
import { useDataLayerValue } from "../context/DataLayer";
import BreadCrumbs from "../components/BreadCrumbs";
import { getError } from "../utils/error";
import { useSnackbar } from "notistack";

export default function Profile() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [{ user }, dispatch] = useDataLayerValue();
    const router = useRouter();
    const [initialValues, setInitialValues] = useState({
        username: "",
        email: "",
    });
    const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

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

    const handleDeleteAccount = () => {
        setOpenDeleteAccountDialog(true);
        setPassword("");
    };

    const handleDeleteAccountDialogClose = () => {
        setOpenDeleteAccountDialog(false);
    };

    const handleDeleteAccountAgree = async () => {
        closeSnackbar();

        const deleteAccountResponse = await axios
            .delete(`/api/users/${user._id}/delete`, {
                data: {
                    password,
                },
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .catch((error) => {
                enqueueSnackbar(getError(error), {
                    variant: "error",
                });
            });

        if (deleteAccountResponse && deleteAccountResponse.data) {
            setPassword("");
            setOpenDeleteAccountDialog(false);

            dispatch({ type: "USER_LOGOUT" });
            Cookies.remove("user");
            Cookies.remove("bag");
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const renderDeleteAccountDialog = (
        <Dialog open={openDeleteAccountDialog} onClose={handleDeleteAccountDialogClose}>
            <DialogTitle>Delete Account</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    <Typography variant="h6" component="span" color="error">
                        WARNING:{" "}
                    </Typography>
                    Deleting your account will clear your shopping bag and remove your profile
                    permanently from our system. Continue only if you feel you are sure.
                    <br />
                    <Typography component="span" variant="body2" color="white" sx={{ mt: 2 }}>
                        To continue, enter your password.
                    </Typography>
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        maxLength: 50,
                    }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleDeleteAccountDialogClose} autoFocus>
                    Cancel
                </Button>

                <Button onClick={handleDeleteAccountAgree} disabled={!password}>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Box sx={{ p: 4 }}>
            <BreadCrumbs />

            <Stack spacing={3} sx={{ alignItems: "center" }}>
                <Main initialValues={initialValues} user={user} />
                <Password user={user} />

                <Button
                    onClick={handleDeleteAccount}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    color="error"
                    sx={{ minWidth: "20rem" }}
                >
                    Delete account
                </Button>
            </Stack>
            {renderDeleteAccountDialog}
        </Box>
    );
}

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import SearchBar from "./SearchBar";
import { useDataLayerValue } from "../../../context/DataLayer";

export default function NavBar() {
    const router = useRouter();
    const [{ bag, user }, dispatch] = useDataLayerValue();

    const [bagProductCount, setBagProductCount] = useState(0);
    const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
    const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    const handleGoToBag = () => {
        router.push(!user ? `/login?redirect=${router.asPath}` : `/bag?user=${user._id}`);
    };

    useEffect(() => {
        if (bag) setBagProductCount(bag.products.length);
        else setBagProductCount(0);
    }, [bag]);

    const isAccountMenuOpen = Boolean(accountMenuAnchor);
    const isMoreMenuOpen = Boolean(moreMenuAnchor);

    const handleAccountMenuOpen = (event) => {
        setAccountMenuAnchor(event.currentTarget);
    };

    const handleMoreMenuOpen = (event) => {
        setMoreMenuAnchor(event.currentTarget);
    };

    const handleMoreMenuClose = () => {
        setMoreMenuAnchor(null);
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchor(null);
        handleMoreMenuClose();
    };

    const handleLogout = () => {
        setOpenLogoutDialog(true);
    };

    const handleLogoutAgree = () => {
        setOpenLogoutDialog(false);
        handleAccountMenuClose();
        dispatch({ type: "USER_LOGOUT" });
        Cookies.remove("user");
        Cookies.remove("bag");
    };

    const handleLogoutDialogClose = () => {
        setOpenLogoutDialog(false);
        handleAccountMenuClose();
    };

    const renderLogoutDialog = (
        <Dialog open={openLogoutDialog} onClose={handleLogoutDialogClose}>
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to log out?"}</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once logged out, you will not be able to access your account, add products to
                    your shopping bag and make payments until you log in again.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleLogoutDialogClose}>Disagree</Button>

                <Button onClick={handleLogoutAgree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );

    const renderAccountMenu = (
        <Box>
            <Menu
                anchorEl={accountMenuAnchor}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                id="account-menu"
                open={isAccountMenuOpen}
                onClose={handleAccountMenuClose}
                keepMounted
            >
                {user
                    ? [
                          <MenuItem onClick={handleLogout} key={1}>
                              Log out
                          </MenuItem>,

                          <MenuItem onClick={handleAccountMenuClose} key={2}>
                              <NextLink href="/profile" passHref>
                                  <Link color="inherit" underline="none">
                                      Profile
                                  </Link>
                              </NextLink>
                          </MenuItem>,
                      ]
                    : [
                          <MenuItem onClick={handleAccountMenuClose} key={1}>
                              <NextLink href="/login" passHref>
                                  <Link color="inherit" underline="none">
                                      Log in
                                  </Link>
                              </NextLink>
                          </MenuItem>,

                          <MenuItem onClick={handleAccountMenuClose} key={2}>
                              <NextLink href="/register" passHref>
                                  <Link color="inherit" underline="none">
                                      Register
                                  </Link>
                              </NextLink>
                          </MenuItem>,
                      ]}
            </Menu>
        </Box>
    );

    const renderMoreMenu = (
        <Menu
            anchorEl={moreMenuAnchor}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            id="more-menu"
            open={isMoreMenuOpen}
            onClose={handleMoreMenuClose}
            keepMounted
            sx={{
                zIndex: 10,
            }}
        >
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={0} color="error" showZero>
                        <ShoppingBagIcon />
                    </Badge>
                </IconButton>
                <p>Shopping bag</p>
            </MenuItem>

            <MenuItem onClick={handleAccountMenuOpen}>
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>My account</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* left menu */}
                    <IconButton
                        sx={{
                            display: { xs: "flex", md: "none" },
                            mr: 2,
                        }}
                        size="large"
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* name of store */}
                    <NextLink href="/" passHref>
                        <Link color="inherit" underline="none">
                            <Typography
                                variant="h5"
                                noWrap
                                component="div"
                                sx={{
                                    display: { xs: "none", sm: "flex" },
                                    ml: { sm: 0, md: 1 },
                                    mr: 4,
                                }}
                            >
                                FaucetLeak
                            </Typography>
                        </Link>
                    </NextLink>

                    {/* search bar */}
                    <SearchBar />

                    <Box sx={{ flexGrow: 1 }} />

                    {/* end icon buttons */}

                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
                        {/* shopping bag */}

                        <IconButton size="large" color="inherit" onClick={handleGoToBag}>
                            <Badge badgeContent={bagProductCount} color="secondary" showZero>
                                <ShoppingBagIcon />
                            </Badge>
                        </IconButton>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {/* user account */}

                            {user && <Typography variant="body1">{user.username}</Typography>}

                            <IconButton
                                size="large"
                                onClick={handleAccountMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* show more */}

                    <Box
                        sx={{
                            display: { xs: "flex", sm: "none" },
                            ml: 2,
                        }}
                    >
                        <IconButton size="large" onClick={handleMoreMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderAccountMenu}
            {renderMoreMenu}
            {renderLogoutDialog}
        </Box>
    );
}

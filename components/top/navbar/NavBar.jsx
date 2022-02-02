import { useState, useEffect } from "react";
import NextLink from "next/link";

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

import SearchBar from "./SearchBar";
import { useDataLayerValue } from "../../../context/DataLayer";

export default function NavBar() {
    const [{ bag, user }, dispatch] = useDataLayerValue();

    const [bagProductCount, setBagProductCount] = useState(0);
    useEffect(() => {
        bag && setBagProductCount(bag.products.length);
    }, [bag]);

    const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
    const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

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
        handleAccountMenuClose();
        dispatch({ type: "USER_LOGOUT" });
    };

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
                {user ? (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                    [
                        <MenuItem onClick={handleAccountMenuClose} key={1}>
                            <NextLink href="/login" passHref>
                                <Link color="inherit" underline="none">
                                    Login
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
                    ]
                )}
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
                        <NextLink href="/" passHref>
                            <Link color="inherit" underline="none">
                                FaucetLeak
                            </Link>
                        </NextLink>
                    </Typography>

                    {/* search bar */}
                    <SearchBar />

                    <Box sx={{ flexGrow: 1 }} />

                    {/* end icon buttons */}

                    <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
                        {/* shopping bag */}

                        <IconButton size="large" color="inherit">
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
        </Box>
    );
}

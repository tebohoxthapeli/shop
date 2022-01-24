import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

export default function BreadcrumbComponent() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Jackets and Coats
        </Typography>,
    ];

    return (
        <Box sx={{ pb: 4 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                {breadcrumbs}
            </Breadcrumbs>
        </Box>
    );
}

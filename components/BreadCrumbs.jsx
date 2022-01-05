import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
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
        <Stack spacing={2} sx={{ pl: 4, pt: 1 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}

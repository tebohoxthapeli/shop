import NextLink from "next/link";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function BreadcrumbComponent() {
    const { asPath } = useRouter();
    let pathWithoutQuery = asPath.split("?")[0];
    pathWithoutQuery = pathWithoutQuery.replace(/%20/g, " ");
    pathWithoutQuery = pathWithoutQuery.replace(/%26/g, "&");
    const chunks = pathWithoutQuery.split("/").slice(1);
    chunks.unshift("Home");

    const bc = chunks.map((c1, i1) => {
        let href = "/";

        if (i1 > 0) {
            chunks.forEach((c2, i2) => {
                if (i2 > i1 || i2 === 0) return;
                href = href.concat(`${c2}/`);
            });
        }

        if (i1 < chunks.length - 1) {
            return (
                <NextLink href={href} passHref key={i1}>
                    <Link underline="hover" color="inherit">
                        {c1}
                    </Link>
                </NextLink>
            );
        } else {
            return (
                <Typography color="text.primary" key={i1}>
                    {c1}
                </Typography>
            );
        }
    });

    return (
        <Box sx={{ mb: 4 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>{bc}</Breadcrumbs>
        </Box>
    );
}

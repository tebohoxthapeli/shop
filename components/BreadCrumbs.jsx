import { useRouter } from "next/router";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function BreadcrumbComponent() {
    const { asPath } = useRouter();
    let pathWithoutQuery = asPath.split("?")[0];
    pathWithoutQuery = pathWithoutQuery.replaceAll("%20", " ");
    pathWithoutQuery = pathWithoutQuery.replaceAll("%26", "&");
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
                <Link href={href} underline="hover" color="inherit" key={i1}>
                    {c1}
                </Link>
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
        <Box sx={{ pb: 4 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>{bc}</Breadcrumbs>
        </Box>
    );
}

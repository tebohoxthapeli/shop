import { useRouter } from "next/router";
import NextLink from "next/link";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

export default function Subcategories({ subcategories }) {
    const { query } = useRouter();

    return (
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="subcategories">
                <Typography>Subcategories</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <List>
                    {subcategories.map((subcategory, index) => (
                        <NextLink
                            href={`/${query.category}/${subcategory}`}
                            passHref
                            key={subcategory}
                        >
                            <Link underline="none" color="inherit">
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={subcategory} />
                                    </ListItemButton>
                                </ListItem>

                                {subcategories.length - 1 !== index && <Divider component="li" />}
                            </Link>
                        </NextLink>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { categories } from "../../utils/data";

export default function Sidebar() {
    return (
        <Box>
            {categories.map(({ id, title, subcategories }) => (
                <Accordion key={id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} id={title}>
                        <Typography>{title}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <List>
                            {subcategories.map(({ name }) => (
                                <>
                                    <Divider component="li" />
                                    <ListItem disablePadding key={name}>
                                        <ListItemButton>
                                            <ListItemText primary={name} />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}

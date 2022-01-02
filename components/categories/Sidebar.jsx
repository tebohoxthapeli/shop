import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { categories } from "../../utils/data";

export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Paper elevation={10}>
            {categories.map(({ id, title, subcategories }) => (
                <Accordion expanded={expanded === id} onChange={handleChange(id)} key={id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} id={title}>
                        <Typography>{title}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <List>
                            {subcategories.map((item) => (
                                <>
                                    <Divider component="li" />
                                    <ListItem disablePadding key={item}>
                                        <ListItemButton>
                                            <ListItemText primary={item} />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Paper>
    );
}

// <Divider />;

import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function SingleCategorySidebar() {
    return (
        <Box sx={{ flex: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Filter
            </Typography>

            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="sort-by">
                    <Typography>Sort by</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <FormControl component="fieldset">
                        <RadioGroup defaultValue="newest" name="radio-sortby-group">
                            <FormControlLabel
                                value="newest"
                                control={<Radio size="small" />}
                                label="Newest"
                            />

                            <FormControlLabel
                                value="most popular"
                                control={<Radio size="small" />}
                                label="Most Popular"
                            />

                            <FormControlLabel
                                value="price (ascending)"
                                control={<Radio size="small" />}
                                label="Price (ascending)"
                            />

                            <FormControlLabel
                                value="price (descending)"
                                control={<Radio size="small" />}
                                label="Price (descending)"
                            />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="max-price">
                    <Typography>Max price</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <FormControl component="fieldset">
                        <RadioGroup defaultValue="10 000" name="radio-maxprice-group">
                            <FormControlLabel
                                value="250"
                                control={<Radio size="small" />}
                                label="R250"
                            />
                            <FormControlLabel
                                value="500"
                                control={<Radio size="small" />}
                                label="R500"
                            />
                            <FormControlLabel
                                value="1000"
                                control={<Radio size="small" />}
                                label="R1 000"
                            />
                            <FormControlLabel
                                value="2000"
                                control={<Radio size="small" />}
                                label="R2 000"
                            />
                            <FormControlLabel
                                value="5000"
                                control={<Radio size="small" />}
                                label="R5 000"
                            />
                            <FormControlLabel
                                value="10 000"
                                control={<Radio size="small" />}
                                label="R10 000"
                            />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="brands">
                    <Typography>Brands</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox size="small" />} label="Cotton On" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Hi-Tec" />
                        <FormControlLabel
                            control={<Checkbox size="small" />}
                            label="Lark & Crosse"
                        />
                        <FormControlLabel control={<Checkbox size="small" />} label="Superbalist" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Trendyol" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Glamorous" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Velvet" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Edit" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Mango" />
                        <FormControlLabel control={<Checkbox size="small" />} label="Soviet" />
                        <FormControlLabel
                            control={<Checkbox size="small" />}
                            label="Chrome Roses"
                        />
                        <FormControlLabel control={<Checkbox size="small" />} label="Adidas" />
                        <FormControlLabel control={<Checkbox size="small" />} label="G-Star RAW" />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="subcategories">
                    <Typography>Subcategories</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Graphic Tees" />
                            </ListItemButton>
                        </ListItem>

                        <Divider component="li" />

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Formal" />
                            </ListItemButton>
                        </ListItem>

                        <Divider component="li" />

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Casual" />
                            </ListItemButton>
                        </ListItem>

                        <Divider component="li" />

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Golf Shirts" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

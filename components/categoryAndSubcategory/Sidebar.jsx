import NextLink from "next/link";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import ListItemButton from "@mui/material/ListItemButton";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccordionSummary from "@mui/material/AccordionSummary";

const sortByOptions = [
    { label: "Newest", value: "newest" },
    { label: "Most Popular", value: "mostPopular" },
    { label: "Least Popular", value: "leastPopular" },
    { label: "Highest Price", value: "highestPrice" },
    { label: "Lowest Price", value: "lowestPrice" },
];

const maxPriceOptions = [
    { label: "R250", value: 250 },
    { label: "R500", value: 500 },
    { label: "R1000", value: 1000 },
    { label: "R2000", value: 2000 },
    { label: "R5000", value: 5000 },
    { label: "R10000", value: 10000 },
];

const brands = [
    "G-Star RAW",
    "Glamorous",
    "Adidas",
    "Cotton-On",
    "Hi-Tec",
    "Lark & Crosse",
    "Superbalist",
    "Trendyol",
    "Edit",
    "Velvet",
    "Mango",
    "Soviet",
    "Chrome Roses",
];

export default function Sidebar({ category }) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Filter
            </Typography>

            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="sort-by">
                    <Typography>Sort by</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <FormControl component="fieldset">
                        <RadioGroup defaultValue="newest" name="sortBy">
                            {sortByOptions.map(({ label, value }) => (
                                <FormControlLabel
                                    value={value}
                                    control={<Radio size="small" />}
                                    label={label}
                                    key={label}
                                />
                            ))}
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
                        <RadioGroup defaultValue="10000" name="maxPrice">
                            {maxPriceOptions.map(({ label, value }) => (
                                <FormControlLabel
                                    value={value}
                                    control={<Radio size="small" />}
                                    label={label}
                                    key={label}
                                />
                            ))}
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
                        {brands.map((brand) => (
                            <FormControlLabel
                                control={<Checkbox size="small" />}
                                label={brand}
                                key={brand}
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            {category && (
                <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} id="subcategories">
                        <Typography>Subcategories</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <List>
                            {category.subcategories.map((sc, index) => (
                                <NextLink href={`/${category.name}/${sc}`} passHref key={sc}>
                                    <Link underline="none" color="inherit">
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={sc} />
                                            </ListItemButton>
                                        </ListItem>

                                        {category.subcategories.length - 1 !== index && (
                                            <Divider component="li" />
                                        )}
                                    </Link>
                                </NextLink>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            )}
        </Box>
    );
}

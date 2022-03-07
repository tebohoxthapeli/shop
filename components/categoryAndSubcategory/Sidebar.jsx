import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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
    "Cotton On",
    "Hi-Tec",
    "Lark & Crosse",
    "Trendyol",
    "Superbalist",
    "Edit",
    "Mango",
    "Glamorous",
    "Velvet",
    "Adidas",
    "Soviet",
    "Chrome Roses",
    "G-Star RAW",
    "Dr Martens",
    "Miss Black",
    "Nike",
];

export default function Sidebar({ category, allBrands }) {
    const { query, ...router } = useRouter();

    const [filters, setFilters] = useState({
        sortBy: query.sortBy || "newest",
        maxPrice: query.maxPrice || 10000,
        brand: query.brand ? (typeof query.brand === "string" ? [query.brand] : query.brand) : [],
    });

    useEffect(() => {
        const urlObject = {
            query: {
                category: query.category,
                sortBy: filters.sortBy,
                maxPrice: filters.maxPrice,
            },
        };

        if (filters.brand.length > 0) urlObject.query.brand = filters.brand;

        if (query.subcategory) {
            urlObject.pathname = "/[category]/[subcategory]";
            urlObject.query.subcategory = query.subcategory;
        } else {
            urlObject.pathname = "/[category]";
        }

        router.replace(urlObject);
        // eslint-disable-next-line
    }, [query.subcategory, query.category, filters]);

    const handleFiltersChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleBrandChange = (brand) => {
        const brandArray = filters.brand;

        if (brandArray.find((item) => item === brand)) {
            setFilters({
                ...filters,
                brand: brandArray.filter((item) => item !== brand),
            });
        } else {
            brandArray.push(brand);
            setFilters({ ...filters, brand: brandArray });
        }
    };

    let renderBrandsFormGroup = (
        <FormGroup>
            {brands.map((brand) => {
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                name={brand}
                                checked={
                                    filters.brand.find((item) => item === brand) ? true : false
                                }
                                onChange={() => handleBrandChange(brand)}
                                disabled={!allBrands.includes(brand)}
                            />
                        }
                        label={brand}
                        key={brand}
                    />
                );
            })}
        </FormGroup>
    );

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
                        <RadioGroup
                            value={filters.sortBy}
                            onChange={handleFiltersChange}
                            name="sortBy"
                        >
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
                        <RadioGroup
                            value={filters.maxPrice}
                            onChange={handleFiltersChange}
                            name="maxPrice"
                        >
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

                <AccordionDetails>{renderBrandsFormGroup}</AccordionDetails>
            </Accordion>

            {category && (
                <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} id="subcategories">
                        <Typography>Subcategories</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <List>
                            {category.subcategories.map((subcategory, index) => (
                                <NextLink
                                    href={`/${category.name}/${subcategory}`}
                                    passHref
                                    key={subcategory}
                                >
                                    <Link underline="none" color="inherit">
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={subcategory} />
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

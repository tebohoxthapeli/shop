import NextLink from "next/link";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import Product from "../Product";

export default function HomeMain({ categories, categoryProducts }) {
    return (
        <Grid container columnSpacing={4} sx={{ p: 4 }}>
            <Grid item xs={2}>
                <Box>
                    {categories.map(({ name, subcategories }) => (
                        <Accordion key={name}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{name}</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <List>
                                    {subcategories.map((subcategory) => (
                                        <NextLink
                                            href={`/${name}/${subcategory}`}
                                            passHref
                                            key={subcategory}
                                        >
                                            <Link underline="none" color="inherit">
                                                <Divider component="li" />
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemText primary={subcategory} />
                                                    </ListItemButton>
                                                </ListItem>
                                            </Link>
                                        </NextLink>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Grid>

            <Grid item xs={10}>
                <Stack spacing={2}>
                    <Typography variant="h3" gutterBottom>
                        Categories
                    </Typography>

                    {categoryProducts.map(({ category, products }) => (
                        <Paper elevation={5} sx={{ p: 2 }} key={category}>
                            <Stack direction="row" sx={{ justifyContent: "space-between", pb: 2 }}>
                                <Typography variant="h6">{category}</Typography>
                                <NextLink href={`/${category}`} passHref>
                                    <Button>Show All</Button>
                                </NextLink>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                {products.map((product) => (
                                    <Product key={product._id} {...product} />
                                ))}
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            </Grid>
        </Grid>
    );
}

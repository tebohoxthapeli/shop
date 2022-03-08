import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

import { useFilterContextValue } from "../../context/productFilterContext/FilterDataLayer";

const brandOptions = [
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

export default function Brands() {
    const [{ brands }, dispatch] = useFilterContextValue();

    const handleChange = (brand) => {
        dispatch({ type: "CHANGE_BRANDS", payload: brand });
    };

    return (
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="brands">
                <Typography>Brands</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <FormGroup>
                    {brandOptions.map((brand) => {
                        return (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        name={brand}
                                        checked={brands.includes(brand)}
                                        onChange={() => handleChange(brand)}
                                    />
                                }
                                label={brand}
                                key={brand}
                            />
                        );
                    })}
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
}

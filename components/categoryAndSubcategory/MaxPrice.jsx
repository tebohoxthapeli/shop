import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { useFilterContextValue } from "../../context/productFilterContext/FilterDataLayer";

const maxPriceOptions = [
    { label: "R500", value: 500 },
    { label: "R1000", value: 1000 },
    { label: "R2000", value: 2000 },
    { label: "R5000", value: 5000 },
    { label: "R10000", value: 10000 },
];

export default function MaxPrice() {
    const [{ maxPrice }, dispatch] = useFilterContextValue();

    const handleChange = (e) => {
        dispatch({ type: "CHANGE_MAX_PRICE", payload: e.target.value });
    };

    return (
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="max-price">
                <Typography>Max price</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <FormControl component="fieldset">
                    <RadioGroup value={maxPrice} onChange={handleChange} name="maxPrice">
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
    );
}

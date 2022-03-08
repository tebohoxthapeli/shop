import Radio from "@mui/material/Radio";
import Accordion from "@mui/material/Accordion";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { useFilterContextValue } from "../../context/productFilterContext/FilterDataLayer";

const sortByOptions = [
    { label: "Newest", value: "newest" },
    { label: "Most Popular", value: "mostPopular" },
    { label: "Least Popular", value: "leastPopular" },
    { label: "Highest Price", value: "highestPrice" },
    { label: "Lowest Price", value: "lowestPrice" },
];

export default function SortBy() {
    const [{ sortBy }, dispatch] = useFilterContextValue();

    const handleChange = (e) => {
        dispatch({ type: "CHANGE_SORT_BY", payload: e.target.value });
    };

    return (
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="sort-by">
                <Typography>Sort by</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <FormControl component="fieldset">
                    <RadioGroup value={sortBy} onChange={handleChange} name="sortBy">
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
    );
}

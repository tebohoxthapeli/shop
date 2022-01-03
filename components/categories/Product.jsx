import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { CardActionArea, CardActions } from "@mui/material";

export default function Product({ name, brand, price, img }) {
    const [value, setValue] = useState(0);

    return (
        <Card sx={{ maxWidth: 345, flex: 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image={img}
                    alt={name}
                    sx={{ objectFit: "contain" }}
                />

                <CardContent>
                    <Typography variant="h6" component="div">
                        {name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {brand}
                    </Typography>

                    <Typography variant="h6" color="text.secondary">
                        R{price}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Rating
                    sx={{ ml: 1 }}
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </CardActions>
        </Card>
    );
}

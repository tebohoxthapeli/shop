import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { CardActionArea, CardActions } from "@mui/material";

export default function Product({ name, brand, price, img }) {
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
                    <Typography variant="body1" component="div">
                        {name}
                    </Typography>

                    <Typography variant="overline" color="text.secondary">
                        {brand}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        R{price}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </CardActions>
        </Card>
    );
}

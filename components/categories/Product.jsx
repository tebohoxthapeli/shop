import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
// import Image from "next/image";

export default function Product() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image="/test 1.jpg" alt="green iguana" />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Product name
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        brand
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        price
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button size="small" color="primary">
                    View details
                </Button>
            </CardActions>
        </Card>
    );
}

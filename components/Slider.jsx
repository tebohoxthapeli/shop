import { useState } from "react";
import Image from "next/image";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import styles from "./styles/Slider.module.css";
import { sliderItems } from "../utils/data";

export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                height: "85vh",

                "&:hover #left-arrow": {
                    display: "block",
                },
                "&:hover #right-arrow": {
                    display: "block",
                },
            }}
        >
            <IconButton
                id="left-arrow"
                color="primary"
                onClick={() => handleClick("left")}
                sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "2%",
                    zIndex: 20,
                    display: "none",
                }}
            >
                <ArrowBackIcon />
            </IconButton>

            <div
                style={{
                    height: "inherit",
                    width: "300vw",
                    display: "flex",
                    transition: "all 1s ease",
                    transform: `translateX(${slideIndex * -100}vw)`,
                }}
            >
                {sliderItems.map((item) => (
                    <div className={styles.slide} key={item.id}>
                        <div className={styles.imgContainer}>
                            <Image src={item.img} alt="carousel image" height={600} width={900} />
                        </div>

                        <div className={styles.infoContainer}>
                            <Typography
                                gutterBottom
                                variant="h2"
                                component="h2"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                {item.title}
                            </Typography>

                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    letterSpacing: 2,
                                }}
                            >
                                {item.desc}
                            </Typography>

                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderWidth: 3,
                                    mt: 3,

                                    "&:hover": {
                                        borderWidth: 3,
                                    },
                                }}
                            >
                                SHOP NOW
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <IconButton
                id="right-arrow"
                color="primary"
                onClick={() => handleClick("right")}
                sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "2%",
                    zIndex: 20,
                    display: "none",
                }}
            >
                <ArrowForwardIcon />
            </IconButton>
        </Box>
    );
}

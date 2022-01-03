import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import { listData } from "../utils/data";

export default function Prefooter() {
    return (
        <Box sx={{ display: "flex", px: 4, py: 2 }}>
            <Box sx={{ flex: 7 }}>
                <Stack direction="row" spacing={2}>
                    {listData.map(({ subHeader, listItems }, index) => (
                        <Box key={index} sx={{ flex: 1 }}>
                            <List
                                dense
                                component="nav"
                                subheader={
                                    <ListSubheader component="div" id="list-subheader">
                                        {subHeader}
                                    </ListSubheader>
                                }
                            >
                                {listItems.map((listItem, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={listItem} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    flex: 3,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h5">Follow us</Typography>

                <Stack spacing={2} direction="row">
                    <IconButton aria-label="delete" size="large">
                        <FacebookIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large">
                        <TwitterIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large">
                        <InstagramIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Box>
    );
}

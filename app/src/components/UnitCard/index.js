import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import useStyles from "./styles";

const UnitCard = ({ unit }) => {
  const classes = useStyles();

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          alt="placeholder"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            $ Price Holder
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number bedroom, Number Washroom, floor number
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Contact Info
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UnitCard;

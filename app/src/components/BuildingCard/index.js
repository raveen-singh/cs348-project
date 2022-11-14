import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

const BuildingCard = ({ building }) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="180"
        image="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {building.address}
        </Typography>
        <Chip label={building.type_of_unit} sx={{ mr: 1 }} />
        <Chip label="Pet-friendly" sx={{ mr: 1 }} />
        <Chip label={`Laundy: ${building.laundry_availability}`} />
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          size="small"
          to={`/building/${building.id}`}
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BuildingCard;

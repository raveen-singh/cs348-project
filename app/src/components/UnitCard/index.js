import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UnitCard = ({ unit, addressDict, setUnitId }) => {
  const navigate = useNavigate();
  const addressArr = Object.keys(addressDict);
  const unitAddress = addressArr.find(
    (building) => addressDict[building] === unit.building_id
  );

  const handleEdit = async (e) => {
    e.preventDefault();
    setUnitId(unit.unit_id);
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/unit/delete?id=${unit.unit_id}`);
      navigate(0);
    } catch (error) {
      console.log(error.message);
    }
  }
  const imgsrc = "data:image/png;base64," + unit.image_data;

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={
          imgsrc ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
      />

      <Box p={2}>
        <Typography variant="body2" color="textSecondary">
          Number of Beds: {unit.num_beds}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Number of Washrooms: {unit.num_washrooms}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Room Number: {unit.room_num}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Floor Number: {unit.floor_num}
        </Typography>
      </Box>
      <Typography px={2} variant="h5">
        {unitAddress}
      </Typography>
      <CardContent>
        <Typography variant="h6" component="h6">
          ${unit.rent_price}/month
        </Typography>
        <Typography variant="h6" component="h6">
          Lease Duration: {unit.lease_term} months
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/unit/${unit.unit_id}`}
        >
          <InfoIcon sx={{ mr: 1 }} />
          Details
        </Button>
        <Button
          size="small"
          color="primary"
          component={Link}
          onClick={handleEdit}
        >
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          component={Link}
          onClick={handleDelete}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default UnitCard;

import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UnitCard = ({ unit, addressDict, setUnitId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const addressArr = Object.keys(addressDict);
  const unitAddress = addressArr.find(
    (building) => addressDict[building] === unit.building_id
  );

  const handleEdit = async (e) => {
    e.preventDefault();
    setUnitId(unit.unit_id);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/unit/delete?id=${unit.unit_id}`);
      navigate(0);
    } catch (error) {
      console.log(error.message);
    }
  };
  const imgsrc = "data:image/png;base64," + unit.image_data;
  const location = useLocation();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

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
          Room Number: {unit.room_num || "N/A"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Floor Number: {unit.floor_num || "N/A"}
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
      <CardActions sx={{ pb: 2 }}>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/unit/${unit.unit_id}`}
        >
          <InfoIcon sx={{ mr: 1 }} />
          Details
        </Button>
        {location.pathname === "/profile" && (
          <>
            <Button
              size="small"
              color="error"
              variant="contained"
              sx={{ mx: 1.5 }}
              startIcon={<DeleteIcon />}
              onClick={handleOpen}
            >
              Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="alert-dialog-title">Delete Unit</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure? You can't undo this action later.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              size="small"
              color="primary"
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default UnitCard;

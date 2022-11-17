import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  IconButton,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileBase from "react-file-base64";
import axios from "axios";

const UnitForm = ({ handleClose, addressDict }) => {
  const currentAddresses = Object.keys(addressDict);
  const navigate = useNavigate();

  const leaseOptions = [
    { value: 4, label: "4 months" },
    { value: 8, label: "8 months" },
    { value: 12, label: "12 months" },
  ];

  const laundryOptions = ["Building", "Ensuite", "None"];
  const typeOptions = ["Apartment", "House"];

  const defaultUnitValues = {
    address: "",
    room_num: "",
    rent_price: 500,
    num_beds: 5,
    num_washrooms: 5,
    lease_term: 4,
    floor_num: "",
    image_path: "",
    new_address: "",
    pet_friendly: 0,
    laundry_availability: "Building",
    type_of_unit: "Apartment",
    distance_from_waterloo: "0.0",
  };

  const defaultBuildingValues = {
    new_address: "",
    pet_friendly: 0,
    laundry_availability: "Building",
    type_of_unit: "Apartment",
    distance_from_waterloo: "0.0",
  };

  const [postData, setPostData] = useState(defaultUnitValues);
  const [newbuilding, setNewBuilding] = useState(defaultBuildingValues);
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");

  const handleNum = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 0) value = 0;
    setPostData({
      ...postData,
      [e.target.name]: value,
    });
  };

  const handleAddress = (e) => {
    const addrId = addressDict[e.target.value];
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
      building_id: addrId,
    });
  };

  const handleBuilding = (e) => {
    setNewBuilding({
      ...newbuilding,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
    const val = checked ? 0 : 1;
    setNewBuilding({
      ...newbuilding,
      [e.target.name]: val,
    });
  };

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postData.address === "Other") {
      setPostData({
        ...postData,
        address: newbuilding.new_address,
        room_num: parseInt(postData.room_num, 10),
      });
      setNewBuilding({
        ...newbuilding,
        distance_from_waterloo: parseFloat(newbuilding.distance_from_waterloo),
      });
      Object.keys(newbuilding).forEach((key) => {
        postData[key] = newbuilding[key];
      });
    }
    try {
      const { data } = await axios.post("/api/unit/create", {
        ...postData,
      });
      if (data.success) {
        navigate(`/units/${data.unit_id}`);
        navigate(0);
        setPostData(defaultUnitValues);
        handleClose();
      } else {
        console.log(data.message);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const makeToast = () => message && toast.error(message);

  useEffect(() => {
    makeToast();
  }, [message]);

  return (
    <>
      <Toaster />
      <Paper
        sx={{
          padding: "2%",
          position: "absolute",
          top: "15%",
          left: "30%",
          width: "40%",
          height: "70%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          noValidate
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5">Unit Information</Typography>
          <IconButton edge="end" aria-label="Edit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            fullWidth
            select
            required
            value={postData.address}
            onChange={handleAddress}
          >
            {currentAddresses.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {postData.address === "Other" && (
            <>
              <TextField
                name="new_address"
                variant="outlined"
                label="New Address"
                fullWidth
                required
                value={newbuilding.new_address}
                onChange={handleBuilding}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="pet_friendly"
                    checked={checked}
                    onClick={handleCheck}
                  />
                }
                label="Pet Friendly"
              />
              <TextField
                name="laundry_availability"
                variant="outlined"
                label="Laundry Availability"
                select
                required
                value={newbuilding.laundry_availability}
                onChange={handleBuilding}
              >
                {laundryOptions.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField
                name="type_of_unit"
                variant="outlined"
                label="Type of Unit"
                select
                required
                value={newbuilding.type_of_unit}
                onChange={handleBuilding}
              >
                {typeOptions.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField
                name="distance_from_waterloo"
                variant="outlined"
                label="Distance From Waterloo"
                required
                value={newbuilding.distance_from_waterloo}
                onChange={handleBuilding}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">km</InputAdornment>
                  ),
                }}
              />
            </>
          )}
          <TextField
            name="rent_price"
            variant="outlined"
            label="Price"
            type="number"
            sx={{ width: "33%" }}
            required
            value={postData.rent_price}
            onChange={handleNum}
          />
          <TextField
            name="num_beds"
            variant="outlined"
            label="Bedrooms"
            type="number"
            sx={{ width: "33%" }}
            required
            value={postData.num_beds}
            onChange={handleNum}
          />
          <TextField
            name="num_washrooms"
            variant="outlined"
            label="Washrooms"
            type="number"
            sx={{ width: "33%" }}
            required
            value={postData.num_washrooms}
            onChange={handleNum}
          />
          <TextField
            name="floor_num"
            variant="outlined"
            label="Floor number"
            type="number"
            value={postData.floor_num}
            sx={{ width: "33%" }}
            onChange={handleNum}
          />
          <TextField
            name="room_num"
            variant="outlined"
            label="Room Number"
            value={postData.room_num}
            onChange={handleChange}
          />
          <TextField
            name="lease_term"
            variant="outlined"
            label="Lease Duration"
            fullWidth
            select
            required
            value={postData.lease_term}
            onChange={handleChange}
          >
            {leaseOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ mt: 1 }}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ name, base64 }) =>
                setPostData({ ...postData, fileName: name, image_path: base64 })
              }
            />
          </Box>
          <Button
            // disabled={
            //   !postData.username ||
            //   !postData.price ||
            //   !postData.numBeds ||
            //   !postData.numWashrooms ||
            //   !postData.leaseDuration
            // }
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default UnitForm;

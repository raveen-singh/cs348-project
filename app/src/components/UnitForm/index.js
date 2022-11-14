import React, { useState } from "react";
import useStyles from "./styles";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileBase from "react-file-base64";
import axios from "axios";

const UnitForm = ({ handleClose, unitId, setUnitId, unitArr, addressArr }) => {
  const classes = useStyles();
  const currentUnit = unitId ? unitArr.find(unit => unit.unit_id === unitId) : null;
  if (currentUnit) {
    const addrPair = addressArr.find(addr => addr[1] === currentUnit.building_id);
    currentUnit.address = addrPair[0];
  }
  const leaseOptions = [
    { value: 4, label: "4 months" },
    { value: 8, label: "8 months" },
    { value: 12, label: "12 months" },
  ];
  const laundryOptions = ["building", "ensuite", "none"];
  const typeOptions = ["apartment", "house"];

  const defaultUnitValues = {
    unit_id: null,
    building_id: null,
    pm_id: null,
    address: "301 Phillip St",
    room_num: 3,
    rent_price: 500,
    num_beds: 5,
    num_washrooms: 5,
    lease_term: 4,
    floor_num: 3,
    image_path: "",
  };
  const defaultBuildingValues = {
    address: "",
    pet_friendly: 1,
    laundry_availability: "building",
    type_of_unit: "apartment",
    distance_from_waterloo: 0
  };

  const [postData, setPostData] = useState(currentUnit ? currentUnit : defaultUnitValues);
  const [newbuilding, setNewBuilding] = useState(defaultBuildingValues);
  console.log(postData);

  const handleNum = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 0) value = 0;
    setPostData({
      ...postData,
      [e.target.name]: value
    });
  };

  const handleBuilding = (e) => {
    setNewBuilding({
      ...newbuilding,
      [e.target.name]: e.target.value,
    });
  }

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
        address: newbuilding.address,
      });
      const res = await axios.post("/api/building/create", {
        ...newbuilding,
      });
    }
    if (unitId) {
      //update unit endpoint
    }
    else {
      const res = await axios.post("/list_unit", {
        ...postData,
      });
    }
    setPostData(defaultUnitValues);
    setUnitId(null);

    handleClose();
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
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
          onChange={handleChange}
        >
          {addressArr.map((option) => (
              <MenuItem value={option[0]}>
                {option[0]}
              </MenuItem>
          ))}
        </TextField>
        { postData.address === "Other" &&
        <>
          <TextField
            name="address"
            variant="outlined"
            label="New Address"
            fullWidth
            required
            value={newbuilding.address}
            onChange={handleBuilding}
          />
          <TextField
            name="pet_friendly"
            variant="outlined"
            label="Pet Friendly"
            type="number"
            className={classes.buildings}
            required
            value={newbuilding.pet_friendly}
            onChange={handleBuilding}
          />
          <TextField
            name="laundry_availability"
            variant="outlined"
            label="Laundry Availability"
            className={classes.buildings}
            select
            required
            value={newbuilding.laundry_availability}
            onChange={handleBuilding}
          >
            {laundryOptions.map((option) => (
                <MenuItem value={option}>
                  {option}
                </MenuItem>
            ))}
          </TextField>
          <TextField
            name="type_of_unit"
            variant="outlined"
            label="Type of Unit"
            className={classes.buildings}
            select
            required
            value={newbuilding.type_of_unit}
            onChange={handleBuilding}
          >
            {typeOptions.map((option) => (
                <MenuItem value={option}>
                  {option}
                </MenuItem>
            ))}
          </TextField>
          <TextField
            name="distance_from_waterloo"
            variant="outlined"
            label="Distance From Waterloo"
            type="number"
            className={classes.buildings}
            required
            value={newbuilding.distance_from_waterloo}
            onChange={handleBuilding}
          />
        </>
        }
        <TextField
          name="room_num"
          variant="outlined"
          label="Room"
          type="number"
          required
          value={postData.room_num}
          className={classes.numbers}
          onChange={handleNum}
        />
        <TextField
          name="rent_price"
          variant="outlined"
          label="Price"
          type="number"
          className={classes.numbers}
          required
          value={postData.rent_price}
          onChange={handleNum}
        />
        <TextField
          name="num_beds"
          variant="outlined"
          label="Bedrooms"
          type="number"
          className={classes.numbers}
          required
          value={postData.num_beds}
          onChange={handleNum}
        />
        <TextField
          name="num_washrooms"
          variant="outlined"
          label="Washrooms"
          type="number"
          className={classes.numbers}
          required
          value={postData.num_washrooms}
          onChange={handleNum}
        />
        <TextField
          name="floor_num"
          variant="outlined"
          label="Floor"
          type="number"
          className={classes.numbers}
          value={postData.floor_num}
          onChange={handleNum}
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
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, image_path: base64 })
            }
          />
        </div>
        <Button
          // disabled={
          //   !postData.username ||
          //   !postData.price ||
          //   !postData.numBeds ||
          //   !postData.numWashrooms ||
          //   !postData.leaseDuration
          // }
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default UnitForm;

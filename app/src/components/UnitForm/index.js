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

const UnitForm = ({ handleClose }) => {
  const classes = useStyles();
  const leaseOptions = [
    { value: 4, label: "4 months" },
    { value: 8, label: "8 months" },
    { value: 12, label: "12 months" },
  ];

  const defaultUnitValues = {
    address: "301 Phillip St",
    room: 3,
    price: 500,
    numBeds: 5,
    numWashrooms: 5,
    leaseDuration: 4,
    floor: 3,
    selectedImage: "",
  };

  const [postData, setPostData] = useState(defaultUnitValues);

  const handleNum = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 0) value = 0;
    handleChange(e);
  };

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/list_unit", {
      ...postData,
    });
    console.log(res);
    setPostData(defaultUnitValues);

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
          required
          value={postData.address}
          onChange={handleChange}
        />
        <TextField
          name="room"
          variant="outlined"
          label="Room"
          type="number"
          fullWidth
          value={postData.room}
          className={classes.numbers}
          onChange={handleChange}
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          type="number"
          className={classes.numbers}
          required
          value={postData.price}
          onChange={handleNum}
        />
        <TextField
          name="numBeds"
          variant="outlined"
          label="Bedrooms"
          type="number"
          className={classes.numbers}
          required
          value={postData.numBeds}
          onChange={handleNum}
        />
        <TextField
          name="numWashrooms"
          variant="outlined"
          label="Washrooms"
          type="number"
          className={classes.numbers}
          required
          value={postData.numWashrooms}
          onChange={handleNum}
        />
        <TextField
          name="floor"
          variant="outlined"
          label="Floor"
          type="number"
          className={classes.numbers}
          value={postData.floor}
          onChange={handleNum}
        />
        <TextField
          name="leaseDuration"
          variant="outlined"
          label="Lease Duration"
          fullWidth
          select
          required
          value={postData.leaseDuration}
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
              setPostData({ ...postData, selectedFile: base64 })
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
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default UnitForm;
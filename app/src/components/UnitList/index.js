import React, { useState, useEffect } from "react";
import { 
  Modal, 
  CircularProgress, 
  Grid, 
  Box, 
  TextField, 
  MenuItem,
  Popover,
  Button,
  Paper,
  Typography
} from "@mui/material";
import axios from "axios";

import UnitForm from "../UnitForm";
import UnitCard from "../UnitCard";
import { useNavigate } from "react-router-dom";

const defaultFetchedUnitValues = {
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

const defaultSortFilterValues = {
  "filter": {
    "field": "",
    "option": "",
    "lowerBound": "0",
    "upperBound": "0"
  },
  "sort": {
    "field": "",
    "direction": ""
  }
}

const sortOptions = ["Rent Price ASC", "Rent Price DESC", "Distance ASC", "Distance DESC"];
const filterOptions = ["Bedrooms", "Washrooms", "Lease Duration", "Pet Friendly", "Laundry Availability", "Type of Unit", "Rent Price", "Distance"];
const laundryOptions = ["Building", "Ensuite", "None"];
const typeOptions = ["Apartment", "House"];
const leaseOptions = [
  { value: 4, label: "4 months" },
  { value: 8, label: "8 months" },
  { value: 12, label: "12 months" },
];
const petOptions = [
  { value: 0, label: "No" },
  { value: 1, label: "Yes" }
];
const UnitList = () => {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState({});
  const [units, setUnits] = useState([]);
  const [unitId, setUnitId] = useState(null);
  const [editPost, setEditPost] = useState(defaultFetchedUnitValues);
  const [condition, setCondition] = useState(defaultSortFilterValues);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  let lb = 0;
  let ub = 0;
  let leaseValue = "";
  let petValue = "";
  let laundryValue = "";
  let typeValue = "";

  const getUnits = async () => {
    try {
      const { data } = await axios.get("/api/unit/get");
      setUnits(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getunitData = async () => {
    const { data }  = await axios.get(`/api/unit/get?id=${unitId}`);
    console.log(data.data[0]);
    Object.keys(data.data[0]).forEach((key) => {
      if (editPost.hasOwnProperty(key)) {
       editPost[key] = data.data[0][key]
      }
    });
    for (const [key, value] of Object.entries(addresses)) {
      if (value === data.data[0].building_id) {
        editPost["address"] = key;
      }
    }
    handleOpen();
  }

  const getAddresses = async () => {
    try {
      const { data } = await axios.get("/api/building/get_addresses");
      const options = data;
      options["Other"] = null;
      setAddresses(options);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddresses();
    getUnits();
  }, []);

  useEffect(() => {
    if (unitId) {
      getunitData();
    }
  }, [unitId])
  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUnitId(null);
    setEditPost(defaultFetchedUnitValues);
  };

  const handlePopOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopClose = (e) => {
    setAnchorEl(null);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    if (e.target.value === "Rent Price ASC") {
      condition["sort"]["field"] = "price";
      condition["sort"]["direction"] = "ASC";
    }
    else if (e.target.value === "Rent Price DESC") {
      condition["sort"]["field"] = "price";
      condition["sort"]["direction"] = "DESC";
    }
    else if (e.target.value === "Distance ASC") {
      condition["sort"]["field"] = "distance";
      condition["sort"]["direction"] = "ASC";
    }
    else if (e.target.value === "Distance DESC") {
      condition["sort"]["field"] = "distance";
      condition["sort"]["direction"] = "DESC";
    }
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  console.log(condition);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UnitForm handleClose={handleClose} addressDict={addresses} unitId={unitId} setUnitId={setUnitId} editPost={editPost} setEditPost={setEditPost} />
      </Modal>
      <TextField
        sx={{ width: "10%", margin: "5px" }}
        name="sortList"
        variant="outlined"
        label="Sort By"
        select
        value={sort}
        onChange={handleSort}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button 
        sx={{ width: "10%", height: "55px", margin: "5px" }} 
        variant="contained" 
        onClick={handlePopOpen}
      >
        Filters
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ width: "400px", height: "400px"}}>
          <TextField
            sx={{ width: "90%", margin: '5px 5%'}}
            name="field"
            variant="outlined"
            label="Filter Options"
            fullWidth
            select
            value={filter}
            onChange={handleFilter}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          { (filter === "Rent Price" || filter === "Distance" || filter === "Bedrooms" || filter === "Washrooms" ) && (
            <>
              <TextField
                name="lowerBound"
                variant="outlined"
                label="Lower Bound"
                type="number"
                sx={{ width: "40%", margin: '5px 5%' }}
                required
                value={lb}
                onChange={handleFilter}
              />
              <TextField
                name="upperBound"
                variant="outlined"
                label="Upper Bound"
                type="number"
                sx={{ width: "40%", margin: '5px 5%' }}
                required
                value={ub}
                onChange={handleFilter}
              />
            </>
          )
          }
          { filter === "Lease Duration" && 
            <TextField
              sx={{ width: "90%", margin: '5px 5%'}}
              name="option"
              variant="outlined"
              label="Filter Values"
              select
              value={leaseValue}
              onChange={handleFilter}
            >
              {leaseOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          }
          { filter === "Pet Friendly" && 
            <TextField
              sx={{ width: "90%", margin: '5px 5%'}}
              name="option"
              variant="outlined"
              label="Filter Values"
              select
              value={petValue}
              onChange={handleFilter}
            >
              {petOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          }
          { filter === "Laundry Availability" && 
            <TextField
              sx={{ width: "90%", margin: '5px 5%'}}
              name="option"
              variant="outlined"
              label="Filter Values"
              select
              value={laundryValue}
              onChange={handleFilter}
            >
              {laundryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          }
          { filter === "Type of Unit" && 
            <TextField
              sx={{ width: "90%", margin: '5px 5%'}}
              name="option"
              variant="outlined"
              label="Filter Values"
              select
              value={typeValue}
              onChange={handleFilter}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          }
        </Paper>
      </Popover>
      <Box sx={{ width: "90%", margin: "25px 5%" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {!units.length ? (
            <CircularProgress />
          ) : (
            <>
              {units.map((unit) => (
                <Grid item xs={12} sm={6} md={4}>
                  <UnitCard unit={unit} addressDict={addresses} setUnitId={setUnitId} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default UnitList;

import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Box,
  TextField,
  MenuItem,
  Popover,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import UnitCard from "../UnitCard";

const defaultSortFilterValues = {
  filter: {
    field: "",
    option: "",
    lowerBound: "0",
    upperBound: "0",
  },
  sort: {
    field: "",
    direction: "",
  },
};

const sortOptions = [
  "Rent Price ASC",
  "Rent Price DESC",
  "Distance ASC",
  "Distance DESC",
];
const filterOptions = [
  "Bedrooms",
  "Washrooms",
  "Lease Duration",
  "Pet Friendly",
  "Laundry Availability",
  "Type of Unit",
  "Rent Price",
  "Distance",
];
const laundryOptions = ["Building", "Ensuite", "None"];
const typeOptions = ["Apartment", "House"];
const leaseOptions = [
  { value: 4, label: "4 months" },
  { value: 8, label: "8 months" },
  { value: 12, label: "12 months" },
];
const petOptions = [
  { value: 0, label: "No" },
  { value: 1, label: "Yes" },
];
const UnitList = () => {
  const [addresses, setAddresses] = useState({});
  const [units, setUnits] = useState([]);
  const [condition, setCondition] = useState(defaultSortFilterValues);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState(null);
  const [option, setOption] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [lb, setlb] = useState(null);
  const [ub, setub] = useState(null);

  const getUnits = async () => {
    try {
      const { data } = await axios.get("/api/unit/get");
      setUnits(data.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handlePopOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopClose = (e) => {
    setAnchorEl(null);
  };

  const handleSort = async (e) => {
    setSort(e.target.value);
    if (e.target.value === "Rent Price ASC") {
      condition["sort"]["field"] = "price";
      condition["sort"]["direction"] = "ASC";
    } else if (e.target.value === "Rent Price DESC") {
      condition["sort"]["field"] = "price";
      condition["sort"]["direction"] = "DESC";
    } else if (e.target.value === "Distance ASC") {
      condition["sort"]["field"] = "distance";
      condition["sort"]["direction"] = "ASC";
    } else if (e.target.value === "Distance DESC") {
      condition["sort"]["field"] = "distance";
      condition["sort"]["direction"] = "DESC";
    }
    try {
      const { data } = await axios.post("/api/unit/get", condition);
      const sortedUnits = [...data.data];
      setUnits(sortedUnits);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setCondition({
      ...condition,
      filter: {
        ...condition.filter,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleFilterDetails = (e) => {
    if (e.target.name === "lowerBound") {
      setlb(e.target.value);
    } else if (e.target.name === "upperBound") {
      setub(e.target.value);
    } else {
      setOption(e.target.value);
    }
    setCondition({
      ...condition,
      filter: {
        ...condition.filter,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setCondition({
      ...condition,
      filter: {
        ...condition.filter,
        ["lowerBound"]: parseFloat(condition["filter"]["lowerBound"]),
        ["upperBound"]: parseFloat(condition["filter"]["upperBound"]),
      },
    });
    try {
      const { data } = await axios.post("/api/unit/get", condition);
      const filteredUnits = [...data.data];
      setUnits(filteredUnits);
    } catch (error) {
      console.log(error.message);
    }
    handlePopClose(e);
  };

  return (
    <div>
      <Box m={3}>
        <TextField
          sx={{ width: "10%", margin: "10px" }}
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
          sx={{ width: "10%", height: "55px", margin: "10px" }}
          variant="contained"
          onClick={handlePopOpen}
        >
          Filters
        </Button>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper sx={{ width: "400px", height: "25%" }}>
          <TextField
            sx={{ width: "90%", margin: "10px 5%" }}
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
          {(filter === "Rent Price" || filter === "Distance") && (
            <>
              <TextField
                name="lowerBound"
                variant="outlined"
                label="Lower Bound"
                type="number"
                sx={{ width: "40%", margin: "5px 5%" }}
                required
                value={lb}
                onChange={handleFilterDetails}
              />
              <TextField
                name="upperBound"
                variant="outlined"
                label="Upper Bound"
                type="number"
                sx={{ width: "40%", margin: "5px 5%" }}
                required
                value={ub}
                onChange={handleFilterDetails}
              />
            </>
          )}
          {(filter === "Bedrooms" || filter === "Washrooms") && (
            <TextField
              sx={{ width: "90%", margin: "5px 5%" }}
              name="option"
              variant="outlined"
              label="Filter Values"
              type="number"
              value={option}
              onChange={handleFilterDetails}
            />
          )}
          {filter === "Lease Duration" && (
            <TextField
              sx={{ width: "90%", margin: "5px 5%" }}
              name="option"
              variant="outlined"
              label="Filter Values"
              select
              value={option}
              onChange={handleFilterDetails}
            >
              {leaseOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
          {filter === "Pet Friendly" && (
            <TextField
              sx={{ width: "90%", margin: "5px 5%" }}
              name="option"
              variant="outlined"
              label="Filter Values"
              select
              value={option}
              onChange={handleFilterDetails}
            >
              {petOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
          {filter === "Laundry Availability" && (
            <TextField
              sx={{ width: "90%", margin: "5px 5%" }}
              name="option"
              variant="outlined"
              label="Filter Values"
              select
              value={option}
              onChange={handleFilterDetails}
            >
              {laundryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
          {filter === "Type of Unit" && (
            <TextField
              sx={{ width: "90%", margin: "5px 5%" }}
              name="option"
              variant="outlined"
              label="Filter Values"
              select
              value={option}
              onChange={handleFilterDetails}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Button
            sx={{ width: "90%", margin: "10px 5%" }}
            variant="contained"
            onClick={handleApply}
          >
            Apply Filters
          </Button>
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
                  <UnitCard unit={unit} addressDict={addresses} />
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

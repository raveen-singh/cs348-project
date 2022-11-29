import React, { useState, useEffect } from "react";
import { Modal, CircularProgress, Grid, Box } from "@mui/material";
import axios from "axios";

import UnitForm from "../UnitForm";
import UnitCard from "../UnitCard";

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

const UnitList = () => {
  const [addresses, setAddresses] = useState({});
  const [units, setUnits] = useState([]);

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

  return (
    <div>
      <Box sx={{ width: "90%", margin: "100px 5%" }}>
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

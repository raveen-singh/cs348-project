import React, { useState, useEffect } from "react";
import { Modal, CircularProgress, Grid, Box } from "@mui/material";
import axios from "axios";

import UnitForm from "../UnitForm";
import UnitCard from "../UnitCard";

const Units = () => {
  const [open, setOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UnitForm handleClose={handleClose} addressDict={addresses} />
      </Modal>
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

export default Units;

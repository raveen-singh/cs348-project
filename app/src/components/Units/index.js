import React, { useState, useEffect } from "react";
import { Button, Modal, CircularProgress, Grid, Box } from "@mui/material";
import axios from "axios";

import UnitForm from "../UnitForm";
import UnitCard from "../UnitCard";
import useStyles from "./styles";

const Units = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [unitId, setUnitId] = useState(null);
  const [addresses, setAddresses] = useState({});
  const [units, setUnits] = useState([]);


  const getUnits = async () => {
    try {
      const result = await axios.get('/api/unit/get');
      setUnits(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddresses = async () => {
    try {
      const result = await axios.get('/api/building/get_addresses');
      const options = result.data;
      options["Other"] = null;
      setAddresses(options);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getAddresses();
    getUnits();
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUnitId(null);
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UnitForm handleClose={handleClose} unitId={unitId} setUnitId={setUnitId} unitArr={units} addressDict={addresses} />
      </Modal>
      <Box sx={{ width: "90%", margin: '100px 5%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {!units.length ? <CircularProgress /> : (
            <>
              {units.map((unit) => (
                  <Grid item xs={12} sm={6} md={4}>
                      <UnitCard unit={unit} setOpen = {setOpen} setUnitId={setUnitId} unitArr={units} addressDict={addresses} />
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

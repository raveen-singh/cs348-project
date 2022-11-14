import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import Modal from "@mui/material/Modal";
import UnitForm from "../UnitForm";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [unitId, setUnitId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [units, setUnits] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUnitId(null);
  }
  
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
      const options = Object.entries(result.data);
      options.push(["Other", 0]);
      setAddresses(options);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getAddresses();
    getUnits();
  }, [])
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar>
          <Button
            variant="filled"
            component={RouterLink}
            sx={{ display: "inline", width: "auto" }}
            to="/"
          >
            Home
          </Button>
          <Button variant="filled" component={RouterLink} to="/register">
            Sign Up
          </Button>
          <Button variant="filled" component={RouterLink} to="/units">
            View All Units
          </Button>
          <Button variant="filled" onClick={handleOpen}>
            Create A Unit
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <UnitForm handleClose={handleClose} unitId={unitId} setUnitId={setUnitId} unitArr={units} addressArr={addresses} />
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

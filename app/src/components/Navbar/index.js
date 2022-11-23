import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

import Modal from "@mui/material/Modal";
import UnitForm from "../UnitForm";
import axios from "axios";
import { Typography } from "@mui/material";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { user, dispatch } = useAuth();

  const logout = async () => {
    const { data } = await axios.post("/api/logout", {
      ...user,
    });
    if (data.success) {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      toast.success("Logged out successfully.");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAddresses = async () => {
    try {
      const result = await axios.get("/api/building/get_addresses");
      const options = result.data;
      options["Other"] = 0;
      setAddresses(options);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <AppBar position="sticky">
      <Toaster />
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button
            variant="filled"
            component={RouterLink}
            sx={{ display: "inline", width: "auto" }}
            to="/"
          >
            Home
          </Button>
          <Button
            variant="filled"
            component={RouterLink}
            sx={{ display: "inline", width: "auto" }}
            to="/buildings"
          >
            View Buildings
          </Button>
          <Button variant="filled" component={RouterLink} to="/units">
            View All Units
          </Button>
          {user && (
            <Button variant="filled" onClick={handleOpen}>
              Create A Post
            </Button>
          )}
        </Box>
        {user ? (
          <Box display="flex" alignItems="center">
            <Typography sx={{ mr: 3 }}>Logged in as {user}</Typography>
            <Button variant="filled" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              variant="filled"
              component={RouterLink}
              to="/register"
              sx={{ mr: 1 }}
            >
              Sign Up
            </Button>
            <Button variant="filled" component={RouterLink} to="/login">
              Login
            </Button>
          </Box>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UnitForm handleClose={handleClose} addressDict={addresses} />
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

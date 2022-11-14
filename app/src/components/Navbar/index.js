import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

import Modal from "@mui/material/Modal";
import UnitForm from "../UnitForm";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
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
          <Button variant="filled" onClick={handleOpen}>
            Create A Post
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <UnitForm handleClose={handleClose} />
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

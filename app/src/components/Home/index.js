import React, { useState } from "react";
import UnitForm from "../UnitForm";
import { Button, Modal } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Link to="/register">Sign Up</Link>
      <br />
      <Button
        sx={{ marginTop: "1rem" }}
        className="Form-button"
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        onClick={handleOpen}
      >
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
    </div>
  );
};

export default Home;

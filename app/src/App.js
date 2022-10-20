import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import Postform from "./components/createPost/postform";
import Post from "./components/post/post";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Button
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
        <Postform handleClose={handleClose} />
      </Modal>
    </div>
  );
}

export default App;

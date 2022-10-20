import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Modal } from "@mui/material";

// Components
import Register from "./components/Register";
import Postform from "./components/createPost/postform";

// Just a dummy component to make navigating to the
// sign up form easier for the feature
const Home = () => {
  return <Link to="/register">Sign Up</Link>;
};

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
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
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

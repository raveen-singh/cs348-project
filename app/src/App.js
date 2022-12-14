import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// Components
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import UnitList from "./components/UnitList";
import UnitPage from "./components/UnitPage";
import BuildingList from "./components/BuildingList";
import BuildingPage from "./components/BuildingPage";
import Profile from "./components/Profile";

const App = () => {
  const [buildings, setBuildings] = useState([]);
  const [addresses, setAddresses] = useState([]);

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

  const getBuildings = async () => {
    const { data } = await axios.get("/api/building/get");
    setBuildings(data.data);
  };

  useEffect(() => {
    getBuildings();
    getAddresses();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/units" element={<UnitList />} />
        <Route exact path="/unit/:id" element={<UnitPage />} />
        <Route
          path="/buildings"
          element={<BuildingList buildings={buildings} />}
        />
        <Route path="/buildings/:id" element={<BuildingPage />} />
        <Route path="/profile" element={<Profile addresses={addresses} />} />
      </Routes>
    </Router>
  );
};

export default App;

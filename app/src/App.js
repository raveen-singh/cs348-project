import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components
import Register from "./components/Register";

// Just a dummy component to make navigating to the
// sign up form easier for the feature
const Home = () => {
  return <Link to="/register">Sign Up</Link>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

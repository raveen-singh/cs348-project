import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

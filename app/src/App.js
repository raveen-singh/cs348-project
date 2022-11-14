import {useState, React} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

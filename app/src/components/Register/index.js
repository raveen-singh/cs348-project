import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    name: "",
    phone_num: "",
    email: "",
    website: "",
  });
  const [message, setMessage] = useState("");
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/lister/create", {
      ...formValues,
    });
    setFormValues({
      username: "",
      password: "",
      name: "",
      phone_num: "",
      email: "",
      website: "",
    });

    if (res.data.status) {
      navigate("/");
    } else {
      setMessage(res.data.message);
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    if (message) {
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          ref={userRef}
          value={formValues.username}
          onChange={handleChange}
          placeholder="username"
          required
        />
        <input
          id="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="password"
          required
        />
        <input
          id="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="name"
          required
        />
        <input
          id="phone_num"
          value={formValues.phone_num}
          onChange={handleChange}
          placeholder="phone number"
          required
        />
        <input
          id="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="email"
          required
        />
        <input
          id="website"
          value={formValues.url}
          onChange={handleChange}
          placeholder="website (optional)"
        />
        <button className="submit-form" type="submit">
          Create Account
        </button>
      </form>
      {message && <p className="err-message">{message}</p>}
    </div>
  );
};

export default Register;

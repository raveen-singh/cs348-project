import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import toast, { Toaster } from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    if (message) {
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormValues({ username: "", password: "" });
    try {
      const { data } = await axios.post("/api/login", {
        ...formValues,
      });
      if (!data.success) {
        setMessage(data.message);
      } else {
        dispatch({ type: "LOGIN", payload: data.session.username });
        localStorage.setItem("user", data.session.username);
        localStorage.setItem("id", data.session.id);
        navigate("/units");
        toast.success("Logged in successfully.");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const makeToast = () => message && toast.error(message);

  useEffect(() => {
    makeToast();
  }, [message]);

  return (
    <Container component="main" maxWidth="xs">
      <Toaster />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            value={formValues.username}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
          />
          <TextField
            value={formValues.password}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

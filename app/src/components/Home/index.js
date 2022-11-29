import React from "react";
import { Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Apartment from "@mui/icons-material/Apartment";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="75vh"
      px={20}
    >
      <Typography fontSize="3rem" textAlign="center" mb={2}>
        Welcome to UWHome!
      </Typography>
      <Box>
        <Button
          component={Link}
          variant="contained"
          startIcon={<Apartment />}
          sx={{ mr: 2 }}
          to="/buildings"
        >
          View Buildings
        </Button>
        <Button
          component={Link}
          variant="contained"
          startIcon={<HomeIcon />}
          to="/units"
        >
          View Units
        </Button>
      </Box>
    </Box>
  );
};

export default Home;

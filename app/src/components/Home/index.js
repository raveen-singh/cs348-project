import React from "react";
import { Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Apartment from "@mui/icons-material/Apartment";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      px={20}
    >
      <Typography fontSize="3rem" textAlign="center" mb={2}>
        Welcome to UWHome!
      </Typography>
      <Box>
        <Button variant="contained" startIcon={<Apartment />} sx={{ mr: 2 }}>
          View Buildings
        </Button>
        <Button variant="contained" startIcon={<HomeIcon />}>
          View Units
        </Button>
      </Box>
    </Box>
  );
};

export default Home;

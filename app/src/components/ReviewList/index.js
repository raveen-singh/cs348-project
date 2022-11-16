import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ReviewList = ({ address }) => {
  return (
    <Box>
      <Typography variant="h5">
        What do students have to say about {address}?
      </Typography>
    </Box>
  );
};

export default ReviewList;

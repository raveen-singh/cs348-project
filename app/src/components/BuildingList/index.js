import { Grid, Container } from "@mui/material";
import React from "react";

import BuildingCard from "../BuildingCard";

const BuildingList = ({ buildings }) => {
  return (
    <Container sx={{ mt: 3 }}>
      <Grid container justifyContent="center" spacing={4}>
        {buildings.map((building) => (
          <Grid key={building.id} item xs={12} sm={6} md={4}>
            <BuildingCard building={building} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BuildingList;

import React from "react";
import { Container } from "@mui/material";

const Profile = ({ units, addresses }) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
      {!units.length ? (
        <CircularProgress />
      ) : (
        <>
          {units.map((unit) => (
            <Grid item key={unit.unit_id} xs={12} sm={6} md={4}>
              <UnitCard unit={unit} addressDict={addresses} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};

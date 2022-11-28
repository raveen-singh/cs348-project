import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import UnitCard from "../UnitCard";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Profile = ({ addresses }) => {
  const [units, setUserUnits] = useState([]);
  const { id } = useAuth();

  const getUserUnits = async () => {
    const { data } = await axios.get(`/api/units/get?id=${id}`);
    setUserUnits(data.data);
    console.log(data);
  };

  useEffect(() => {
    getUserUnits();
  }, []);

  return (
    <Container sx={{ p: 5 }}>
      <Typography variant="h3">My Units</Typography>
      <Box mt={2}>
        {!units.length ? (
          <Typography>You still haven't created any units!</Typography>
        ) : (
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {units.map((unit) => (
              <Grid item key={unit.unit_id} xs={12} sm={6} md={4}>
                <UnitCard unit={unit} addressDict={addresses} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Profile;

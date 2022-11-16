import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BuildingCard from "../BuildingCard";
import ReviewForm from "../ReviewForm";
import ReviewList from "../ReviewList";

const BuildingPage = () => {
  const [building, setBuilding] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const getBuilding = async () => {
      const { data } = await axios.get(`/api/building/get?id=${id}`);
      setBuilding(data.data);
    };
    getBuilding();
  }, []);

  if (!building) {
    return <CircularProgress />;
  }

  //
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        <Grid item sm={12} md={6}>
          <BuildingCard building={building} />
        </Grid>
        <Grid item sm={12} md={6}>
          <ReviewList address={building.address} />
        </Grid>
        <Grid item sm={12} md={6}>
          <ReviewForm user={user} building_id={id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuildingPage;

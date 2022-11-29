import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BuildingCard from "../BuildingCard";
import ReviewForm from "../ReviewForm";
import ReviewList from "../ReviewList";

const BuildingPage = () => {
  const [building, setBuilding] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  const [names, setNames] = useState([]);

  useEffect(() => {
    const getBuilding = async () => {
      const { data } = await axios.get(`/api/building/get?id=${id}`);
      setBuilding(data.data);
    };
    getBuilding();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      const { data } = await axios.get(`/api/reviews/get?id=${id}`);
      return data.reviews;
    };
    getReviews();

    const getNames = async () => {
      let reviews = await getReviews();
      setReviews(reviews);

      const { data } = await axios.get(`/api/reviews/get_random_names?number=${reviews.length}`);
      setNames(data);
    };

    getNames();

  }, []);


  if (!building) {
    return <CircularProgress />;
  }

  //
  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={6}>
        <Grid item sm={12} md={6}>
          <Stack spacing={3}>
            <BuildingCard building={building} />
            <ReviewForm user={user} building_id={id} />
          </Stack>
        </Grid>
        <Grid item sm={12} md={6}>
          <ReviewList reviews={reviews} address={building.address} names={names} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuildingPage;

import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuildingCard from "../BuildingCard";

const BuildingPage = () => {
  const [building, setBuilding] = useState(null);
  const { id } = useParams();

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
    <Container sx={{ mt: 3 }}>
      <BuildingCard building={building} />
    </Container>
  );
};

export default BuildingPage;

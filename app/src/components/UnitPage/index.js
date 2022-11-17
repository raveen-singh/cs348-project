import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UnitPage = () => {
  const [unit, setUnit] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUnit = async () => {
      const { data } = await axios.get(`/api/unit/get?id=${id}`);
      setUnit(data.data);
    };
    getUnit();
  }, []);

  if (!unit) {
    return <CircularProgress />;
  }

  //
  return <Container sx={{ mt: 3 }}>Unit ID: {unit.unit_id}</Container>;
};

export default UnitPage;

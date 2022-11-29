import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

const UnitPage = () => {
  const [unit, setUnit] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUnit = async () => {
      const { data } = await axios.get(`/api/unit/get?id=${id}`);
      setUnit(data.data[0]);
      console.log(data.data[0]);
    };
    getUnit();
  }, []);

  if (!unit) {
    return <CircularProgress />;
  }

  const imgsrc = "data:image/png;base64," + unit.image_data;

  return (
    <Paper sx={{ mx: "auto", my: 8, width: "70%" }}>
      <Box display="flex" flexDirection={{ sm: "column", md: "row" }}>
        <Stack width={{ sm: "100%", md: "50%" }}>
          <Paper
            sx={{ width: 500, height: 350 }}
            component="img"
            src={imgsrc}
          />
        </Stack>
        <Stack mt={3} px={5} sx={{ width: { sm: "100%", md: "50%" } }}>
          <Typography variant="h4" fontWeight={500} mb={2}>
            Unit Details
          </Typography>
          <Typography variant="h6" mb={2}>
            Address: {unit.address}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Stack spacing={1}>
              <Typography>{unit.num_beds} Bedrooms</Typography>
              <Typography>{unit.num_washrooms} Washrooms</Typography>
              {unit.room_num && (
                <Typography>Room Number: {unit.room_num}</Typography>
              )}
            </Stack>
            <Stack spacing={1}>
              {unit.floor_num && (
                <Typography>Floor Number: {unit.floor_num}</Typography>
              )}
              <Typography>Lease: {unit.lease_term} months</Typography>
              <Typography>Rent Price: ${unit.rent_price}</Typography>
            </Stack>
          </Box>
          <Link
            component={RouterLink}
            to={`/buildings/${unit.building_id}`}
            variant="body1"
            sx={{ mt: 3 }}
          >
            View Building
          </Link>
        </Stack>
      </Box>
    </Paper>
  );
};

export default UnitPage;

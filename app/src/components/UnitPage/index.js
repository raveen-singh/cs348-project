import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
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
    <Paper sx={{ mx: "auto", my: 8, width: "80%", maxWidth: "1100px" }}>
      <Box display="flex" flexDirection={{ sm: "column", md: "row" }}>
        <Stack width={{ sm: "100%", md: "50%" }}>
          <Paper
            sx={{ width: 550, height: 400 }}
            component="img"
            src={imgsrc}
          />
        </Stack>
        <Stack mt={3} px={5} sx={{ width: { sm: "100%", md: "50%" } }}>
          <Typography variant="h4" fontWeight={500} mb={2}>
            Rent: ${unit.rent_price}/Month
          </Typography>
          <Typography variant="h6" mb={2}>
            Address: {unit.address}
          </Typography>

          <Box display="flex">
            <Stack spacing={1} mr={5}>
              <Box display="flex">
                {unit.type_of_unit.toLowerCase() === "house" ? (
                  <>
                    <HomeIcon sx={{ mr: 1 }} />
                    <Typography>House</Typography>
                  </>
                ) : (
                  <>
                    <ApartmentIcon sx={{ mr: 1 }} />
                    <Typography>Apartment</Typography>
                  </>
                )}
              </Box>
              <Typography>
                {unit.distance_from_waterloo} km from campus
              </Typography>
              <Typography>{unit.num_beds} Bedrooms</Typography>
              <Typography>{unit.num_washrooms} Washrooms</Typography>
              {unit.room_num && (
                <Typography>Room Number: {unit.room_num}</Typography>
              )}
            </Stack>
            <Stack spacing={1}>
              <Box display="flex">
                {unit.pet_friendly ? (
                  <>
                    <CheckIcon sx={{ color: "green", mr: 1 }} />
                    <Typography>Pet-Friendly</Typography>
                  </>
                ) : (
                  <>
                    <ClearIcon sx={{ color: "red", mr: 1 }} />
                    <Typography>No Pets</Typography>
                  </>
                )}
              </Box>
              <Box display="flex">
                {unit.laundry_availability.toLowerCase() === "none" ? (
                  <>
                    <ClearIcon sx={{ color: "red", mr: 1 }} />
                    <Typography>No Laundry</Typography>
                  </>
                ) : (
                  <>
                    <CheckIcon sx={{ color: "green", mr: 1 }} />
                    <Typography>{unit.laundry_availability} Laundry</Typography>
                  </>
                )}
              </Box>
              {unit.floor_num && (
                <Typography>Floor Number: {unit.floor_num}</Typography>
              )}
              <Typography>Lease: {unit.lease_term} months</Typography>
            </Stack>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link
              component={RouterLink}
              to={`/buildings/${unit.building_id}`}
              variant="body1"
              sx={{ mt: 3 }}
            >
              View Building
            </Link>
            <Stack spacing={1}>
              <Typography>Posted by {unit.name}</Typography>
              <Typography>Contact info: {unit.email}</Typography>
              {unit.website && (
                <Link href={unit.website} target="__blank">
                  Visit Website
                </Link>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default UnitPage;

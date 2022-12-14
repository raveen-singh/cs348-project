import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const BuildingCard = ({ building }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          <LocationOnIcon sx={{ mr: 1 }} /> {building.address}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          {building.distance_from_waterloo} km from campus
        </Typography>
        <Stack spacing={1}>
          <Box display="flex">
            {building.pet_friendly ? (
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
            {building.laundry_availability.toLowerCase() === "none" ? (
              <>
                <ClearIcon sx={{ color: "red", mr: 1 }} />
                <Typography>No Laundry</Typography>
              </>
            ) : (
              <>
                <CheckIcon sx={{ color: "green", mr: 1 }} />
                <Typography>{building.laundry_availability} Laundry</Typography>
              </>
            )}
          </Box>
          <Box display="flex">
            {building.type_of_unit.toLowerCase() === "house" ? (
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
          <Box
            display="flex"
            justifyContent="space-evenly"
            width="100%"
            border="1px solid black"
            borderRadius="5px"
            py="0.7rem"
          >
            <Typography sx={{ mr: 1 }} textAlign="center">
              <Rating
                defaultValue={building.cleanliness_rating}
                precision={0.1}
                readOnly
              />
              <Typography>Cleanliness</Typography>
            </Typography>
            <Typography textAlign="center">
              <Rating
                defaultValue={building.admin_rating}
                precision={0.1}
                readOnly
              />
              <Typography>Admin Helpfulness</Typography>
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BuildingCard;

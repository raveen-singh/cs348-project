import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Box, Modal } from "@mui/material";
import UnitCard from "../UnitCard";
import UnitForm from "../UnitForm";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Profile = ({ addresses }) => {
  const defaultFetchedUnitValues = {
    address: "",
    room_num: "",
    rent_price: 500,
    num_beds: 5,
    num_washrooms: 5,
    lease_term: 4,
    floor_num: "",
    image_path: "",
    new_address: "",
    pet_friendly: 0,
    laundry_availability: "Building",
    type_of_unit: "Apartment",
    distance_from_waterloo: "0.0",
  };

  const [units, setUserUnits] = useState([]);
  const [unitId, setUnitId] = useState(null);
  const [editPost, setEditPost] = useState(defaultFetchedUnitValues);
  const [open, setOpen] = useState(false);
  const { id } = useAuth();

  const getUserUnits = async () => {
    const { data } = await axios.get(`/api/units/get?id=${id}`);
    setUserUnits(data.data);
    console.log(data);
  };

  const getUnitData = async () => {
    const { data } = await axios.get(`/api/unit/get?id=${unitId}`);
    console.log(data.data[0]);
    Object.keys(data.data[0]).forEach((key) => {
      if (editPost.hasOwnProperty(key)) {
        editPost[key] = data.data[0][key];
      }
    });
    for (const [key, value] of Object.entries(addresses)) {
      if (value === data.data[0].building_id) {
        editPost["address"] = key;
      }
    }
    handleOpen();
  };

  useEffect(() => {
    getUserUnits();
  }, []);

  useEffect(() => {
    if (unitId) {
      getUnitData();
    }
  }, [unitId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUnitId(null);
    setEditPost(defaultFetchedUnitValues);
  };

  return (
    <Container sx={{ p: 5 }}>
      <Typography variant="h3">My Units</Typography>
      <Modal open={open} onClose={handleClose}>
        <UnitForm
          handleClose={handleClose}
          addressDict={addresses}
          unitId={unitId}
          setUnitId={setUnitId}
          editPost={editPost}
          setEditPost={setEditPost}
        />
      </Modal>
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
                <UnitCard
                  unit={unit}
                  addressDict={addresses}
                  setUnitId={setUnitId}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Profile;

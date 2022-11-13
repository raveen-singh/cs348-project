import React, { useState } from "react";
import { Button, Modal, CircularProgress, Grid, Grow, Container } from "@mui/material";

import UnitForm from "../UnitForm";
import UnitCard from "../UnitCard";
import useStyles from "./styles";

const Units = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [unitId, setUnitId] = useState(null);


  const availableUnits = [
    {
      unitId: 1,
      address: "256 Phillip St",
      room: 2,
      price: 1000,
      numBeds: 3,
      numWashrooms: 2,
      leaseDuration: 4,
      floor: 3,
      selectedImage: "",
    },
    {
      unitId: 2,
      address: "301 Phillip St",
      room: 3,
      price: 1500,
      numBeds: 5,
      numWashrooms: 3,
      leaseDuration: 8,
      floor: 4,
      selectedImage: "",
    },
    {
      unitId: 3,
      address: "301 Phillip St",
      room: 3,
      price: 1500,
      numBeds: 5,
      numWashrooms: 3,
      leaseDuration: 8,
      floor: 4,
      selectedImage: "",
    },
    {
      unitId: 4,
      address: "500 Phillip St",
      room: 3,
      price: 1500,
      numBeds: 5,
      numWashrooms: 3,
      leaseDuration: 8,
      floor: 4,
      selectedImage: "",
    }
  ];
  const addresses = ["500 Phillip St", "256 Phillip St", "301 Phillip St", "Other"];


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUnitId(null);
  }
  return (
    <div>
      <Button
        sx={{ marginTop: "1rem" }}
        className="Form-button"
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        onClick={handleOpen}
      >
        Create A Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UnitForm handleClose={handleClose} unitId={unitId} setUnitId={setUnitId} unitArr={availableUnits} addressArr={addresses} />
      </Modal>
      <Grow in>
          <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6}>
                    {!availableUnits.length ? <CircularProgress /> : (
                      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                        {availableUnits.map((unit) => (
                            <Grid item xs={12} sm={6}>
                                <UnitCard unit={unit} setOpen = {setOpen} setUnitId={setUnitId} unitArr={availableUnits}/>
                            </Grid>
                        ))}
                      </Grid>
                    )}
                    </Grid>
                </Grid>
          </Container>
        </Grow>
    </div>
  );
};

export default Units;

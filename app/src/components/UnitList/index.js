import React, { useState } from "react";
import { Modal, CircularProgress, Grid, Box } from "@mui/material";

import UnitForm from "../UnitForm";
import UnitCard from "../UnitCard";

const UnitList = ({ units, addresses }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UnitForm handleClose={handleClose} addressDict={addresses} />
      </Modal>
      <Box sx={{ width: "90%", my: 6, mx: "auto" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {!units.length ? (
            <CircularProgress />
          ) : (
            <>
              {units.map((unit) => (
                <Grid item xs={12} sm={6} md={4}>
                  <UnitCard unit={unit} addressDict={addresses} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default UnitList;

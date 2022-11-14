import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import React from "react";

const BuildingList = ({ buildings }) => {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <Grid
      container
      sx={{ mt: 5, flexDirection: { sm: "column-reverse", md: "row" } }}
    >
      <Grid item sm={12} md={8}>
        <TableContainer sx={{ px: { sm: 0, md: 4 } }}>
          <Table sx={{ minWidth: 650 }} component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Address
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="center"
                >
                  Laundry
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="center"
                >
                  Pet-Friendly
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="center"
                >
                  Cleanliness
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  align="center"
                >
                  Admin Helpfulness
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buildings.map(({ building_id, ...building }) => (
                <TableRow key={building_id}>
                  <TableCell align="center">
                    <Link
                      component={RouterLink}
                      to={`/buildings/${building_id}`}
                    >
                      <ManageSearchIcon />
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {building.address}
                  </TableCell>
                  <TableCell align="center">
                    {capitalize(building.laundry_availability)}
                  </TableCell>
                  <TableCell align="center">
                    {building.pet_friendly ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {building.cleanliness_rating || "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    {building.admin_rating || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* In the future, filter and sort box will go here */}
      <Grid item sm={12} md={4}>
        Filter and Sort in the future
      </Grid>
    </Grid>
  );
};

export default BuildingList;

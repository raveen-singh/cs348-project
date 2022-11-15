import React from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  Box
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import useStyles from "./styles";

const UnitCard = ({ unit, setOpen, setUnitId, unitArr, addressDict }) => {
  const classes = useStyles();
  const addressArr = Object.keys(addressDict);
  const unitAddress = addressArr.find(building => addressDict[building] === unit.building_id);

  const handleUpdate = (e) => {
    setOpen(true);
    setUnitId(unit.unit_id);
  }

  const handleDelete = async (e) => {
    const res = await axios.delete(`/api/unit/delete?id={${unit.unit_id}}`);
    console.log(res);
  }
  // Check if current user created the post to show the button
  return (
      <Card className={classes.card}>
            <CardMedia className={classes.media} image={unit.image} title={"availableUnit"}/>
            <div className={classes.overlay}>
                <Typography variant="h6">Name placeholder</Typography>
                <Typography variant="body2">time placeholder</Typography>
            </div>
            
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} onClick={handleUpdate}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">Number of Beds: {unit.num_beds}</Typography>
                <Typography variant="body2" color="textSecondary">Number of Washrooms: {unit.num_washrooms}</Typography>
                <Typography variant="body2" color="textSecondary">Room Number: {unit.room_num}</Typography>
                <Typography variant="body2" color="textSecondary">Floor Number: {unit.floor_num}</Typography>
                
            </div>
            <Typography className={classes.title} variant="h5" >{unitAddress}</Typography> 
            <CardContent>
                <Typography variant="h6" component="h6" >${unit.rent_price}/month</Typography> 
                <Typography variant="h6" component="h6" >Lease Duration: {unit.lease_term} months</Typography> 
            </CardContent>
            <CardActions className={classes.cardActions}> 
                <Button size="small" color="primary" onClick={() => {}}>
                    <InfoIcon />
                    Details
                </Button>
                <Button size="small" color="primary" onClick={handleDelete}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
      </Card>
    );
};

export default UnitCard;
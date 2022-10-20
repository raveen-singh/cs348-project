import React, { useState } from 'react';
import useStyles from './postformstyle';
import { TextField, Button, Typography, Paper, MenuItem, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileBase from 'react-file-base64';


const Postform = ({ handleClose }) => {
    const classes = useStyles();
    const leaseoptions = [
      {value: 4, label: '4 months'},
      {value: 8, label: '8 months'},
      {value: 12, label: '12 months'}
    ];

    const [postData, setPostData] = useState({ 
        address: '',
        roomnumber: 101,
        price: 1000,
        numbedroom: 1,
        numwashroom: 1,
        leaseterms: 4,
        floornum: 0,
        selectedImage: ''
    });

    const clear = () => {
        setPostData({
          address: '',
          roomnumber: 101,
          price: 1000,
          numbedroom: 1,
          numwashroom: 1,
          leaseterms: 4,
          floornum: 0,
          selectedImage: ''
        })
    };

    const handleNum = (e) => {
      let value = parseInt(e.target.value, 10);
      if (value < 0) value = 0;
      handleChange(e);
    };

    const handleChange = (e) => {
        setPostData({
          ...postData,
          [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      /* const res = await axios.post("/register_lister", {
        ...formValues,
      });
      clear();
  
      if (res.data.status) {
        navigate("/");
      } else {
        setMessage(res.data.message);
      }
      handleClose(); */
    };
  

    return (
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="h5">{'Creating a New Post'}</Typography>
            <IconButton edge="end" aria-label="Edit" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <TextField name="address" variant="outlined" label="Address" fullWidth required value={postData.address} onChange={handleChange}/>
            <TextField name="roomnumber" variant="outlined" label="RoomNumber" type="number" fullWidth value={postData.roomnumber} onChange={handleChange}/>
            <TextField name="price" variant="outlined" label="Price" type="number" className={classes.numbers} required value={postData.price} onChange={handleNum} />
            <TextField name="numbedroom" variant="outlined" label="Number of Bedrooms" type="number" className={classes.numbers} required value={postData.numbedroom} onChange={handleNum} />
            <TextField name="numwashroom" variant="outlined" label="Number of Washrooms" type="number" className={classes.numbers} required value={postData.numwashroom} onChange={handleNum} />
            <TextField name="floornum" variant="outlined" label="Floor Number" type="number" className={classes.numbers} value={postData.floornum} onChange={handleNum} />
            <TextField name="leaseterms" variant="outlined" label="Lease Terms" fullWidth select value={postData.leaseterms} onChange={handleChange}>
              {leaseoptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          </form>
        </Paper>
      );
}

export default Postform;
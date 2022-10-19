import React, { useState } from 'react';
import useStyles from './postformstyle';
import { TextField, Button, Typography, Paper, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import FileBase from 'react-file-base64';


const Postform = ({ handleClose }) => {
    const classes = useStyles();
    const leaseoptions = [
      {value: 4, label: '4 months'},
      {value: 8, label: '8 months'},
      {value: 12, label: '12 months'}
    ];

    const [postData, setPostData] = useState({ 
        fullname: '',
        phonenumber: '',
        email: '',
        website: '',
        price: 1000,
        numbedroom: 1,
        numwashroom: 1,
        leaseterms: 4,
        petfriendly: false,
        floornum: 1,
        selectedImage: ''
    });

    const clear = () => {
        setPostData({
          fullname: '',
          phonenumber: '',
          email: '',
          website: '',
          price: 1000,
          numbedroom: 1,
          numwashroom: 1,
          leaseterms: 4,
          petfriendly: false,
          floornum: 1,
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
    const handleChecked = (e) => {
      setPostData({
        ...postData,
        petfriendly: e.target.checked
      });
    }

    const handleSubmit = (e) => {
      
    };

    return (
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="h5">{'Creating a New Post'}</Typography>
            <TextField name="fullname" variant="outlined" label="Fullname" fullWidth required value={postData.title} onChange={handleChange} />
            <TextField name="phonenumber" variant="outlined" label="PhoneNumber" fullWidth required value={postData.phonenumber} onChange={handleChange}/>
            <TextField name="email" variant="outlined" label="Email" fullWidth required value={postData.email} onChange={handleChange} />
            <TextField name="website" variant="outlined" label="Website" fullWidth value={postData.website} onChange={handleChange} />
            <TextField name="price" variant="outlined" label="Price" type="number" className={classes.numbers} required value={postData.price} onChange={handleNum} />
            <TextField name="numbedroom" variant="outlined" label="Number of Bedrooms" type="number" className={classes.numbers} required value={postData.numbedroom} onChange={handleNum} />
            <TextField name="numwashroom" variant="outlined" label="Number of Washrooms" type="number" className={classes.numbers} required value={postData.numwashroom} onChange={handleNum} />
            <TextField name="floornum" variant="outlined" label="Floor Number" type="number" className={classes.numbers} required value={postData.floornum} onChange={handleNum} />
            <TextField name="leaseterms" variant="outlined" label="Lease Terms" fullWidth select value={postData.leaseterms} onChange={handleChange}>
              {leaseoptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel control={<Checkbox checked={postData.petfriendly} onChange={handleChecked} label="Pet Friendly" inputProps={{ 'aria-label': 'controlled' }}/>} label="Pet-Friendly"/>
            <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            <Button className={classes.buttonSubmit} variant="contained" color="error" size="small" onClick={handleClose} fullWidth>Close</Button> 
          </form>
        </Paper>
      );
}

export default Postform;
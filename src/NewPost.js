import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const NewPost = () => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    },
    textField: {
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
      width: '100%',
    },
    heading: {
      textAlign: 'center',
      width: '100%',
    },
    input: {
      width: '100%',
      display: 'none',
    },
  }));
  const classes = useStyles();
  const [photo, setPhoto] = useState();
  const [description, setdescription] = useState('');
  const handleNewPhoto = e => {
    const newPhoto = e.target.files[0];
    setPhoto(newPhoto);
    console.log(newPhoto);
  };

  return (
    <Box className={classes.container}>
      <h1 className={classes.heading}>New Post</h1>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={e => handleNewPhoto(e)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Select image
        </Button>
      </label>

      <TextField
        className={classes.textField}
        id="standard-uncontrolled"
        label="description"
        margin="normal"
        value={description}
        onChange={e => setdescription(e.target.value)}
      />

      <Button variant="contained" color="primary" className={classes.button}>
        Post
      </Button>
    </Box>
  );
};

export default NewPost;

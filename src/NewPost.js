import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const NewPost = () => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: '350px',
      justifyContent: 'center',
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
    preview: {
      height: 'auto',
      minHeight: '300px',
      width: '100%',
      maxWidth: '300px',
    },
    previewPlaceholder: {
      width: '300px',
      height: '300px',
      backgroundColor: 'lightgrey',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
  const classes = useStyles();
  const [photo, setPhoto] = useState();
  const [description, setdescription] = useState('');
  const [newPhotoPreviewUrl, setNewPhotoPreviewUrl] = useState(null);

  const handleNewPhoto = e => {
    const newPhoto = e.target.files[0];
    setNewPhotoPreviewUrl(URL.createObjectURL(e.target.files[0]));
    setPhoto(newPhoto);
    console.log(newPhoto);
  };

  return (
    <Box className={classes.container}>
      <h1 className={classes.heading}>New Post</h1>

      {newPhotoPreviewUrl ? (
        <img
          className={classes.preview}
          alt="preview"
          src={newPhotoPreviewUrl}
        />
      ) : (
        <div className={classes.previewPlaceholder}>No image selected</div>
      )}

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

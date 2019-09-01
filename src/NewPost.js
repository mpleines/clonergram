import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { database, storage } from './index.js';

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
    outerPlaceholder: {
      width: '300px',
      height: '300px',
    },
  }));
  const classes = useStyles();
  const [photo, setPhoto] = useState();
  const [description, setdescription] = useState('');
  const [newPhotoPreviewUrl, setNewPhotoPreviewUrl] = useState(null);

  const handleNewPhoto = e => {
    setNewPhotoPreviewUrl(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };

  const addPostToDatabase = () => {
    const storageRef = storage.ref();
    const newImageRef = storageRef.child(`/images/ ${Math.random()}`); //TODO: change this to a UUID later
    newImageRef.put(photo).then(snapshot => {
      newImageRef.getDownloadURL().then(url => {
        console.log('uploaded new photo', url);
        // add post to database
        database
          .ref('posts')
          .set({
            photo: url,
            description: description,
          })
          .then(post => console.log('added a new post'));
      });
    });
  };

  return (
    <Box className={classes.container}>
      <h1 className={classes.heading}>New Post</h1>

      <div className={classes.outerPlaceholder}>
        {newPhotoPreviewUrl ? (
          <img
            className={classes.preview}
            alt="preview"
            src={newPhotoPreviewUrl}
          />
        ) : (
          <div className={classes.previewPlaceholder}>No image selected</div>
        )}
      </div>

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

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={addPostToDatabase}
      >
        Post
      </Button>
    </Box>
  );
};

export default NewPost;

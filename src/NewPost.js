import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { database, storage } from './index.js';
import { navigate } from '@reach/router/lib/history';
const uuidv4 = require('uuid/v4');

const NewPost = () => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '310px',
      justifyContent: 'center',
    },
    textField: {
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
      alignSelf: 'flex-end',
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
        // create uuid for post
        const uuid = uuidv4();
        console.log(uuid);
        // add post to database
        database.ref(`posts/${uuid}`).set({
          photo: url,
          description: description,
          creationDate: firebase.database.ServerValue.TIMESTAMP,
          comments: [
            'hey richtig tolles bild man!',
            'wow, so cool...',
            'arsch',
          ],
          likes: { count: 1209, likedBy: ['user1', 'user2', 'user19'] },
        });
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
          <div className={classes.previewPlaceholder}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={e => handleNewPhoto(e)}
            />
            <label
              htmlFor="contained-button-file"
              style={{
                display: 'flex',
                flexAlign: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Button
                variant="contained"
                component="span"
                className={classes.button}
                color="primary"
              >
                Select image
              </Button>
            </label>
          </div>
        )}
      </div>

      <TextField
        className={classes.textField}
        id="standard-uncontrolled"
        label="description"
        margin="normal"
        value={description}
        onChange={e => setdescription(e.target.value)}
      />

      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          variant="contained"
          className={classes.button}
          onClick={addPostToDatabase}
        >
          CREATE NEW POST
        </Button>
      </div>
    </Box>
  );
};

export default NewPost;

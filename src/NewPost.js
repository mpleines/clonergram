import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { database, storage } from './index.js';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const uuidv4 = require('uuid/v4');

const NewPost = () => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: 400,
    },
    card: {
      margin: 10,
      textAlign: 'left',
      width: '100%',
    },
    media: {
      height: 230,
    },
    mediaPlaceholder: {
      backgroundColor: 'lightgrey',
      height: 230,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
        // add post to database
        database.ref(`posts/${uuid}`).set({
          id: uuid,
          photo: url,
          description: description,
          creationDate: firebase.database.ServerValue.TIMESTAMP,
          username: firebase.auth().currentUser.displayName,
          comments: [],
          likes: { count: 0 },
        });
      });
    });
  };

  return (
    <Box className={classes.container}>
      <Typography style={{ width: '100%' }} variant="h5" gutterBottom>
        Create new Post
      </Typography>

      <Card className={classes.card}>
        {newPhotoPreviewUrl ? (
          <CardMedia className={classes.media} image={newPhotoPreviewUrl} />
        ) : (
          <div className={classes.mediaPlaceholder}>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="fileInput"
              type="file"
              onChange={e => handleNewPhoto(e)}
            />
            <label htmlFor="fileInput">
              <Button
                variant="contained"
                component="span"
                className={classes.button}
              >
                Upload Image
              </Button>
            </label>
          </div>
        )}

        <CardContent>
          <TextField
            id="standard-name"
            label="Description"
            className={classes.textField}
            value={description}
            onChange={e => setdescription(e.target.value)}
            margin="normal"
          />
        </CardContent>
        <CardActions display="flex">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={addPostToDatabase}
            style={{ alignSelf: 'right' }}
          >
            Upload Post
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default NewPost;

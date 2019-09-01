import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Box } from '@material-ui/core';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { database } from './index.js';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '350px',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Feed = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState([]);

  const imageWrapper = {
    width: '350px',
    height: '300px',
    borderColor: '10px solid green',
  };

  const image = {
    height: 'auto',
    maxWidth: '300px',
  };

  const loadFeed = () => {
    database
      .ref('posts')
      .once('value')
      .then(snapshot => {
        console.log([snapshot.val()]);
        setFeed([snapshot.val()]);
      });
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="examples">
        {feed.length > 0 && feed[0] != null ? (
          feed.map(item => {
            return (
              <ListItem key={item}>
                <Box display="flex" flexDirection="column">
                  <Box
                    style={{
                      display: 'flex',
                      height: '300px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    className={imageWrapper}
                  >
                    <img
                      src={item.photo}
                      onLoad={e => setIsLoading(false)}
                      className={image}
                      style={{
                        display: isLoading ? 'none' : 'block',
                        width: '100%',
                        height: 'auto',
                      }}
                      alt="example images"
                    />

                    {isLoading && <Loader type="Circles" color="#somecolor" />}
                  </Box>

                  <Box
                    height="40px"
                    display="flex"
                    width="20%"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <FavoriteBorderIcon />
                    <InsertCommentIcon />
                  </Box>

                  <Box fontSize="14px">0 likes</Box>

                  <Box>
                    <p>{item.description}</p>
                  </Box>
                </Box>
              </ListItem>
            );
          })
        ) : (
          <h1>No Posts yet...</h1>
        )}
      </List>
    </div>
  );
};

export default Feed;

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import Typography from '@material-ui/core/Typography';
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

  const loadFeed = () => {
    database
      .ref('posts/')
      .once('value')
      .then(snapshot => {
        const feedItems = [];
        snapshot.forEach(item => {
          feedItems.push(item.val());
        });
        setFeed(feedItems);
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
              <ListItem key={item.photo}>
                <Box display="flex" flexWrap="wrap" height="100%" width="300px">
                  <Box
                    display="flex"
                    minHeight="200px"
                    maxHeight="300px"
                    width="100%"
                    justifyContent="left"
                    alignItems="center"
                  >
                    <img
                      src={item.photo}
                      onLoad={e => setIsLoading(false)}
                      display={isLoading ? 'none' : null}
                      width="100%"
                      height="auto"
                      alt="example images"
                    />
                    {isLoading && (
                      <Loader type="Circles" color="#somecolor" width={300} />
                    )}
                  </Box>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    width={'100%'}
                    justifyContent="space-between"
                  >
                    <Box width={'10%'} margin={0}>
                      <FavoriteBorderIcon />
                    </Box>
                    <Box width={'90%'}>
                      <InsertCommentIcon />
                    </Box>
                    <Box width={'100%'}>
                      <Typography variant="subtitle2" gutterBottom>
                        0 likes
                      </Typography>
                    </Box>
                    <Box width={'100%'}>
                      <Typography variant="subtitle1" gutterBottom>
                        <b>User</b> {item.description}
                      </Typography>
                    </Box>
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

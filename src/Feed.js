import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { database } from './index.js';
import FeedItem from './FeedItem';

import Container from '@material-ui/core/Container';
const avatarSad = require('./assets/avatars/sad.png');

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: 30,
  },
  itemList: {},
}));

const Feed = () => {
  const classes = useStyles();
  const [feed, setFeed] = useState([]);

  const loadFeed = () => {
    database
      .ref('posts/')
      .orderByChild('creationDate')
      .once('value')
      .then(snapshot => {
        const feedItems = [];
        snapshot.forEach(item => {
          feedItems.push(item.val());
        });
        // reverse the list so it displays the posts
        // ordered by creationDate DESC
        setFeed(feedItems.reverse());
      });
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <Container className={classes.root}>
      <List className={classes.itemList} component="nav" aria-label="examples">
        {feed.length > 0 && feed[0] != null ? (
          feed.map(item => {
            return <FeedItem key={item.photo} item={item}></FeedItem>;
          })
        ) : (
          <div>
            <img
              src={avatarSad}
              style={{ width: 150, height: 150 }}
              alt="sad face"
            ></img>
            <Typography component="h1" variant="h5">
              No Posts yet
            </Typography>
          </div>
        )}
      </List>
    </Container>
  );
};

export default Feed;

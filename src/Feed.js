import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { database } from './index.js';
import FeedItem from './FeedItem';
const avatarSad = require('./assets/avatars/sad.png');

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '350px',
    backgroundColor: theme.palette.background.paper,
  },
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
    <div className={classes.root}>
      <List component="nav" aria-label="examples">
        {feed.length > 0 && feed[0] != null ? (
          feed.map(item => {
            return (
              <ListItem key={item.photo}>
                <FeedItem item={item}></FeedItem>
              </ListItem>
            );
          })
        ) : (
          <div>
            <img
              src={avatarSad}
              style={{ width: 150, height: 150 }}
              alt="sad face"
            ></img>
            <h1>No Posts yet...</h1>
          </div>
        )}
      </List>
    </div>
  );
};

export default Feed;

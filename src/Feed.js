import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { database } from './index.js';
import FeedItem from './FeedItem';

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
                <FeedItem item={item}></FeedItem>
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

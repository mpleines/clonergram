import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Container, Box } from '@material-ui/core';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '350px',
    backgroundColor: theme.palette.background.paper,
    imageWrapper: {
      width: '350px',
      height: '350px',
      borderColor: '10px solid green',
    },
    image: {
      height: 'auto',
      width: '100%',
    },
  },
}));

const Feed = () => {
  const classes = useStyles();

  const examples = [1, 2, 3, 4, 5, 6, 7, 8];
  const testImage = 'http://placecorgi.com/300/300';
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="examples">
        {examples.map(item => {
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
                >
                  <img
                    src={testImage}
                    onLoad={e => setIsLoading(false)}
                    className={classes.image}
                    style={{ display: isLoading ? 'none' : 'block' }}
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
                  <p>
                    <b>User </b>Lorem ipsum dolor sit amet, consetetur
                    sadipscing elitr.
                  </p>
                </Box>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Feed;

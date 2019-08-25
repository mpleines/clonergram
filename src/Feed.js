import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Container, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Feed = () => {
  const classes = useStyles();

  const examples = [1, 2, 3, 4, 5, 6, 7, 8];
  const testImage = 'http://placecorgi.com/300/300';

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="examples">
        {examples.map(item => {
          return (
            <ListItem key={item}>
              <Box
                my={4}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <img src={testImage} alt="example images" />
                <Box
                  display="flex"
                  justifyContent="space-around"
                  width="40%"
                  alignItems="center"
                >
                  <Box display="flex">
                    <FavoriteBorderIcon />
                    <span>0 likes</span>
                  </Box>
                  <InsertCommentIcon />
                </Box>

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

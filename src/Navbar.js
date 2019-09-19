import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { firebaseApp } from './index.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

const logoutUser = () => {
  firebaseApp.auth().signOut();
};

const ButtonAppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Clonergram
          </Typography>
          <Button onClick={logoutUser}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;

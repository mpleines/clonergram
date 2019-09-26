import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import { firebaseApp } from './index.js';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const logoutUser = () => {
  firebaseApp.auth().signOut();
};

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h5">
        Settings
      </Typography>
      <Box component="span" m={1}>
        <Typography variant="subtitle1" gutterBottom>
          logged in as
          <b> {firebaseApp.auth().currentUser.displayName}</b>
        </Typography>
      </Box>

      <List component="nav" aria-label="user specific settings">
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Change Username" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Delete Account" />
        </ListItem>
        <Divider />
      </List>

      <Box component="span" display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={logoutUser}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default Settings;

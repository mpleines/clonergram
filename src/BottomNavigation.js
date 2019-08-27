import React from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  stickToBottom: {
    position: 'fixed',
    bottom: 0,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={`${classes.root} ${classes.stickToBottom}`}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Feed"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/newpost"
        label="New Post"
        icon={<AddAPhotoIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/settings"
        label="Settings"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}

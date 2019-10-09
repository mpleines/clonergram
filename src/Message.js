import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    color: 'red',
    marginTop: 20,
  },
}));

const Message = props => {
  const classes = useStyles();
  return (
    <div>
      {props.show ? (
        <Paper className={classes.root}>
          <Typography component="p">{props.info}</Typography>
        </Paper>
      ) : null}
    </div>
  );
};

export default Message;

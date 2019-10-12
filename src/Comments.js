import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: 450,
    marginBottom: 20,
    textAlign: 'left',
  },
}));

const Comments = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.root}>
        <IconButton aria-label="like" onClick={props.handler}>
          <ArrowBackIosIcon />
        </IconButton>
        {props.comments === undefined || props.comments.length === 0 ? (
          <ListItem>
            <ListItemText primary={'No Comments yet'} />
          </ListItem>
        ) : (
          <List component="nav" aria-label="main mailbox folders">
            {props.comments.map(comment => {
              return (
                <div>
                  <ListItem key={comment.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.text}
                      secondary={comment.user}
                    />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        )}
      </div>
    </Card>
  );
};

export default Comments;

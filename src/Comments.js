import React, { useState } from 'react';
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
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import CardActions from '@material-ui/core/CardActions';
import NewComment from './NewComment';

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: 450,
    marginBottom: 20,
    textAlign: 'left',
  },
  comments: {
    height: 300,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Comments = props => {
  const classes = useStyles();
  // destructure post from props
  const { post } = props;
  const [showNewComment, setShowNewComment] = useState(false);
  const toggleNewComment = () => {
    setShowNewComment(!showNewComment);
  };
  return (
    <div>
      <Card className={classes.card}>
        {showNewComment ? (
          <NewComment handler={toggleNewComment} post={post} />
        ) : null}
        <div className={classes.comments}>
          <IconButton aria-label="like" onClick={props.handler}>
            <ArrowBackIosIcon />
          </IconButton>
          <CardActions>
            <IconButton aria-label="addComment" onClick={toggleNewComment}>
              <InsertCommentIcon />
            </IconButton>
          </CardActions>
          {post.comments === undefined || post.comments.length === 0 ? (
            <ListItem>
              <ListItemText primary={'No Comments yet'} />
            </ListItem>
          ) : (
            <List component="nav" aria-label="main mailbox folders">
              {post.comments.map(comment => {
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
    </div>
  );
};

export default Comments;

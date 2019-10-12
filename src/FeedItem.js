import React, { useState, useEffect } from 'react';
import { database, firebaseApp } from './index.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import Link from '@material-ui/core/Link';
import Comments from './Comments';

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: 450,
    marginBottom: 20,
    textAlign: 'left',
  },
  link: {
    margin: theme.spacing(1),
  },
  media: {
    height: 150,
    paddingTop: '56.25%', // 16:9
  },
}));

const FeedItem = props => {
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const classes = useStyles();

  const toggleLike = () => {
    const currentUser = firebaseApp.auth().currentUser.displayName;
    setIsLikedByUser(!isLikedByUser);
    // get current post from database
    const post = props.item;
    // increase or decrease the likes of the post
    if (isLikedByUser) {
      post.likes.count--;
      // remove the user from likedBy
      const index = post.likes.likedBy.indexOf(currentUser);
      post.likes.likedBy.splice(index, 1);
    } else {
      post.likes.count++;
      if (post.likes.likedBy) {
        post.likes.likedBy.push(currentUser);
      } else {
        post.likes.likedBy = [currentUser];
      }
    }
    // update post in firebase
    database.ref(`posts/${post.id}`).set(post);
  };

  const toggleCommentModal = () => {
    setShowComments(!showComments);
  };

  const checkIfLikedByUser = () => {
    if (props.item.likes.likedBy) {
      // set the state of isLikedByUser depending
      // on wether the user liked the post or not
      setIsLikedByUser(
        props.item.likes.likedBy.includes(
          firebaseApp.auth().currentUser.displayName
        )
      );
    }
  };

  useEffect(() => {
    checkIfLikedByUser();
  }, []);

  return (
    <div>
      {showComments ? (
        <Comments handler={toggleCommentModal} comments={props.item.comments} />
      ) : (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={props.item.photo}
            title={props.item.photo}
          />
          <CardContent>
            <Typography
              variant="caption"
              display="block"
              color="textSecondary"
              component="p"
            >
              {props.item.likes.count}{' '}
              {props.item.likes.count > 1 || props.item.likes.count == 0
                ? 'likes'
                : 'like'}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <b>{props.item.username} </b>
              {props.item.description}
            </Typography>
          </CardContent>

          <CardActions>
            {isLikedByUser ? (
              <IconButton aria-label="unlike" size="small" onClick={toggleLike}>
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="like" size="small" onClick={toggleLike}>
                <FavoriteBorderIcon />
              </IconButton>
            )}

            <IconButton
              aria-label="comment"
              size="small"
              onClick={toggleCommentModal}
            >
              <CommentIcon />
            </IconButton>
            {props.item.comments ? (
              <Link
                className={classes.link}
                style={{ cursor: 'pointer' }}
                onClick={toggleCommentModal}
              >
                Show all {props.item.comments.length} Comments
              </Link>
            ) : (
              <Typography variant="body2" color="textSecondary" component="p">
                No Comments yet
              </Typography>
            )}
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default FeedItem;

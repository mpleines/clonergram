import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    maxWidth: 320,
    margin: 10,
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
  const classes = useStyles();
  return (
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
          {props.item.likes.count} Likes
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>maikroo </b>
          {props.item.description}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton aria-label="like" size="small">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment" size="small">
          <CommentIcon />
        </IconButton>
        <Link className={classes.link} style={{ cursor: 'pointer' }}>
          Show all {props.item.comments.length} Comments
        </Link>
      </CardActions>
    </Card>
  );
};

export default FeedItem;

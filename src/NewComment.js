import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { firebaseApp } from './index.js';

const NewComment = props => {
  const { post } = props;
  const [newComment, setNewComment] = useState('');
  const handleNewComment = () => {
    // create array of comments if missing
    if (post.comments === undefined) {
      post.comments = [];
    }
    post.comments.push({
      id: Math.random(),
      user: firebaseApp.auth().currentUser.displayName,
      text: newComment,
    });
    console.log(post.comments);
    // persist the state
    firebaseApp
      .database()
      .ref(`posts/${post.id}`)
      .set(post);
    // close the modal
    props.handler();
  };
  return (
    <div>
      <Dialog aria-labelledby="form-dialog-title" open={true}>
        <DialogTitle id="form-dialog-title">Add New Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newComment"
            label="New Comment"
            type="text"
            fullWidth
            onChange={e => setNewComment(e.target.value)}
            onBlur={e => setNewComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handler} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNewComment} color="primary">
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewComment;

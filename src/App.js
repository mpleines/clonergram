import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import './App.css';
import BottomNavigation from './BottomNavigation';
import Navbar from './Navbar';
import Feed from './Feed';
import NewPost from './NewPost';
import Settings from './Settings';
import { firebaseApp } from './index.js';

import { Container, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authListener = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', user.uid);
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
  };

  const loginUser = _ => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('successfully logged in user');
      })
      .catch(err => alert(err));
  };

  useEffect(() => {
    authListener();
  }, [user]);

  const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <div className="App">
      <Container mx="auto">
        <Box m={4} display="flex" justifyContent="center" alignItems="center">
          <Navbar />
        </Box>
        <Box
          my={4}
          marginTop={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {user ? (
            <Router>
              <Feed path="/" />
              <NewPost path="/newpost" />
              <Settings path="settings" />
            </Router>
          ) : (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={e => e.preventDefault()}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={loginUser}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          )}
        </Box>
        <Box display="flex" justifyContent="center">
          <BottomNavigation />
        </Box>
      </Container>
    </div>
  );
}

export default App;

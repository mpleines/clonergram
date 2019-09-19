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

  const loginUser = () => {
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
            <form onSubmit={e => e.preventDefault()}>
              <h1>Login</h1>
              <label>E-Mail</label>
              <input type="text" onChange={e => setEmail(e.target.value)} />
              <label>Password</label>
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={loginUser}>Login</button>
            </form>
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

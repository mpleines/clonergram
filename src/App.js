import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import BottomNavigation from './BottomNavigation';
import Navbar from './Navbar';
import Feed from './Feed';
import NewPost from './NewPost';
import Settings from './Settings';

import { Container, Box } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Container mx="auto">
        <Box m={4} display="flex" justifyContent="center" alignItems="center">
          <Navbar />
        </Box>
        <Box my={4} display="flex" justifyContent="center" alignItems="center">
          <Router>
            <Feed path="/" />
            <NewPost path="/newpost" />
            <Settings path="settings" />
          </Router>
        </Box>
        <Box display="flex" justifyContent="center">
          <BottomNavigation />
        </Box>
      </Container>
    </div>
  );
}

export default App;

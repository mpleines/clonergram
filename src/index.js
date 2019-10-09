import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// handle firebase stuff
import firebase from 'firebase';
import firebaseConfig from './Firebase/config.js';
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const database = firebaseApp.database();
export const storage = firebaseApp.storage();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

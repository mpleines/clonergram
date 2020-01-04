import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// handle firebase stuff
import firebase from 'firebase';
import firebaseConfig from './Firebase/config.js';

let deployConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'clonergram.firebaseapp.com',
  databaseURL: 'https://clonergram.firebaseio.com',
  projectId: 'clonergram',
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: '131112068955',
  appId: '1:131112068955:web:2747c63a687bbe71',
};

if (firebaseConfig === undefined) console.log('firebaseconfig undefined');

export const firebaseApp =
  firebaseConfig === undefined
    ? firebase.initializeApp(deployConfig)
    : firebase.initializeApp(firebaseConfig);
export const database = firebaseApp.database();
export const storage = firebaseApp.storage();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

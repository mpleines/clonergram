import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// handle firebase stuff
import firebase from 'firebase-admin';

let deployConfig = {
  apiKey: process.env.CLONERGRAM_APP_FIREBASE_APIKEY,
  authDomain: process.env.CLONERGRAM_APP_AUTHDOMAIN,
  databaseURL: process.env.CLONERGRAM_APP_DATABASE_URL,
  projectId: process.env.CLONERGRAM_APP_PROJECTID,
  storageBucket: process.env.CLONERGRAM_APP_STORAGEBUCKET,
  messagingSenderId: process.env.CLONERGRAM_APP_MESSAGINGSENDERID,
  appId: process.env.CLONERGRAM_APP_APPID,
};

export const firebaseApp = firebase.initializeApp(deployConfig);
export const database = firebaseApp.database();
export const storage = firebaseApp.storage();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

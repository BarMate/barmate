//=============================================================
// Firebase.js
//
// Firebase initialization for app.
// Use in files that need firebase access
// To use: import firebase from 'this-file';
//
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================

import * as firebase from 'firebase';

let config = {
    apiKey: 'AIzaSyDjPFOudF-tbgPBbe_yWnW-M4Z6YxOvAEg',
    authDomain: 'barmate-e95b6.firebaseapp.com',
    databaseURL: 'https://barmate-e95b6.firebaseio.com',
    projectId: 'barmate-e95b6',
    storageBucket: 'barmate-e95b6.appspot.com',
    messagingSenderId: '314206837329'
};
firebase.initializeApp(config);

export default firebase;
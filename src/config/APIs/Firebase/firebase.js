/**
 * Firebase API Setup
 * 
 * Initialize firebase for barmate
 * 
 */

import * as firebase from 'firebase';
import API_KEY from './api_key';    // not commited to github

let config = {
    apiKey: API_KEY,
    authDomain: 'barmate-e95b6.firebaseapp.com',
    databaseURL: 'https://barmate-e95b6.firebaseio.com',
    projectId: 'barmate-e95b6',
    storageBucket: 'gs://barmate-e95b6.appspot.com/',
    messagingSenderId: '314206837329'
};

firebase.initializeApp(config);
export default firebase;
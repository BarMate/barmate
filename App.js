import App from './app/index';
import firebase from 'firebase';

//Initialization keys for firebase. Do not change
firebase.initializeApp({
    apiKey: "AIzaSyDjPFOudF-tbgPBbe_yWnW-M4Z6YxOvAEg",
    authDomain: "barmate-e95b6.firebaseapp.com",
    databaseURL: "https://barmate-e95b6.firebaseio.com",
    storageBucket: "barmate-e95b6.appspot.com"
})

export default App;
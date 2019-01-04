/* 
    Profile.js (screen)

    The screen for holding the profile component

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved.
*/


// Imports
import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Dimensions,
} from 'react-native';

import Profile from '../components/Profile.js';   // Profile Component
import firebase from '../config/Firebase.js';

class LoggedInUserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: firebase.auth().currentUser.uid
        }
    }

    render() {
        return (
            <Profile uid={this.state.uid}/>
        );
    }
}

export default LoggedInUserProfile;
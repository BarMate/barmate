/* 
    Profile.js (screen)

    The screen for holding the profile component

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved.
*/

// Imports
import React from "react";
import { AsyncStorage, StyleSheet, Dimensions } from "react-native";
import CurrentUserProfile from '../components/Profiles/CurrentUserProfile'
import firebase from '../config/Firebase'
class ProfileScreen extends React.Component {

    getUID() {
        return firebase.auth().currentUser.uid;
    }

    render() {
        return (
            <CurrentUserProfile uid={this.getUID()}/>
        );
    }
}

export default ProfileScreen;

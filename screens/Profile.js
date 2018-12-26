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



class ProfileScreen extends React.Component {
    render() {
        return (
            <Profile currentUserProfile={true}/>
        );
    }
}

export default ProfileScreen;
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
import SelectedUserProfile from '../../components/Profiles/SelectedUserProfile'

class SelectedUserProfileScreen extends React.Component {
    render() {
        return (
            <SelectedUserProfile />
        );
    }
}

export default SelectedUserProfileScreen;

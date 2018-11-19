//=============================================================
// Profile.js (screen)
//
// The screen for holding the profile component
// 
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================


//=============================================================
// Imports
//=============================================================
import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';   // Icon for tab
import Profile from '../../components/Profile.js';   // Profile Component
//=============================================================


class ProfileScreen extends React.Component {

    //=============================================================
    // Definitions for the profile tab on the tab bar
    //=============================================================
    static navigationOptions = {

        tabBarIcon: ({ focused, tintColor }) => (
            focused ? <Ionicons name={'ios-person'} size={25} color={'#FFFFFF'} />
                : <Ionicons name={'ios-person'} size={25} color={'#536497'} />
        ),
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'white',
            inactiveTintColor: '#536497',
            style: {
                backgroundColor: '#100D64',
            }
        },
        animationEnabled: false,
        swipeEnabled: false,
    }
    //=============================================================

    render() {
        return (
            <Profile navigation={this.props.navigation}/>
        );
    }
}

export default ProfileScreen;
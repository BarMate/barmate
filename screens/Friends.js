//=============================================================
// Profile.js (component)
//
// A component for holding the characteristics of
// a barmate user profile.
//
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================

import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    Alert,
    ScrollView,
    StatusBar,
    Text,
    FlatList, 
    RefreshControl,
} from 'react-native';


import { withNavigation } from 'react-navigation';
import firebase from '../config/Firebase';

import {LinearGradient} from 'expo'

import Variables from '../config/Variables';
import COLORS from '../config/Colors.js';
import { Ionicons } from "@expo/vector-icons";
import { pushFriendsList, selectProfile, eraseFriendsList, refreshFriendsList, selectMessageProfile, updateFriendCount } from '../redux/actions/FriendsActions'

import { connect } from 'react-redux';
import FriendsCard from '../components/Friends/FriendsCard';

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [
                {
                    name: 'jon',
                    key: '1234123'
                },
                {
                    name: 'beth',
                    key: '234234'
                }
            ]
        };  
    }

    render() {
        return (                    
            <LinearGradient
                style={styles.gradient}
                colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
            >
                <StatusBar barStyle="light-content"/>
                <View style={styles.rootContainer}>
                    <View style={styles.friendCountContainer}>
                        <Text style={styles.friendCount}>21 Friends</Text>
                    </View>
                    <View style={styles.flatlistContainer}>
                        <FlatList 
                            renderItem={({item}) => <FriendsCard name={item.name} key={Math.random()} />}
                            data={this.state.friends}
                            contentContainerStyle={styles.flatlist}
                            keyExtractor={(item, index) => item.key}
                        />
                    </View>

                </View>
            </LinearGradient>
        );
    }   
}

// Extract data from store
const mapStateToProps = state => ({
    friends: state.friendsReducer.friends,
    refreshing: state.friendsReducer.refreshing,
    friendCount: state.friendsReducer.friendCount,
})
  
// Dispatch data to store
const mapDispatchToProps = {
    pushFriendsList,
    selectProfile,
    eraseFriendsList,
    refreshFriendsList,
    selectMessageProfile,
    updateFriendCount,
}
  
const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        width: Variables.deviceWidth,
        height: Variables.deviceHeight
    },
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    friendCountContainer: {
        flex: 1,
        width: Variables.deviceWidth,
        justifyContent: 'center',
    },
    flatlistContainer: {
        flex: 10,
    },
    friendCount: {
        marginLeft: 20,
        fontSize: 25,
        fontFamily: 'HkGrotesk_Medium',
        color: 'white',
    },
    flatlist: {
        paddingTop: 20,
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Friends));
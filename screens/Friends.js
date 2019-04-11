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
import { pushFriends, updateLoading } from '../redux/actions/FriendsActions'

import { connect } from 'react-redux';
import FriendsCard from '../components/Friends/FriendsCard';
import BasicLoadingIndicator from '../components/BasicLoadingIndicator'

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
        };  
    }

    componentWillMount() {
        this.sendData();
    }

    _renderIndicator() {
        return(
          <BasicLoadingIndicator animating={this.props.loading} />
        )
    }

    _emptyList() {
        return (
            <Text style={styles.emptyList}>No friends</Text>
        )
    }

    sendData() {
        let uid = firebase.auth().currentUser.uid

        let usersRef = firebase.database().ref(`users/${uid}/`)
        usersRef.once('value', snapshot => {
            snapshot.child('friends').forEach(child => {
                firebase.database().ref(`users/${child.val()}`).once('value', friendSnap => {
                    this.props.pushFriends(friendSnap.val())
                })
            })
        }).then(this.props.updateLoading(false))
    }

    render() {
        return (                    
            <LinearGradient
                style={styles.gradient}
                colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
            >
                <StatusBar barStyle="light-content"/>
                <View style={styles.rootContainer}>
                    {this._renderIndicator()}
                    <View style={styles.friendCountContainer}>
                        <Text style={styles.friendCount}>{this.props.friends.length} Friends</Text>
                    </View>
                    <View style={styles.flatlistContainer}>
                        <FlatList 
                            ref={list => {this.listref = list}}
                            renderItem={({item}) => <FriendsCard pic={item.picURL} name={item.name} id={item.uid} key={Math.random()} />}
                            data={this.props.friends}
                            contentContainerStyle={styles.flatlist}
                            keyExtractor={(item, index) => item.handle}
                            ListEmptyComponent={this._emptyList()}
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
    loading: state.friendsReducer.loading,
})
  
// Dispatch data to store
const mapDispatchToProps = {
    pushFriends,
    updateLoading,  
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
    emptyList: {
        fontSize: 20,
        fontFamily: 'HkGrotesk_Italic',
        color: 'white',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Friends));
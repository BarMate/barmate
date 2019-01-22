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
import FriendsCard from '../components/FriendsCard'

import { connect } from 'react-redux';

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };  
    }

    componentWillMount() {
        this._refreshing();
    }

    pullFriendsListDataFromDatabase() {
        let uid = firebase.auth().currentUser.uid

        let usersRef = firebase.database().ref(`users/${uid}/`)
        usersRef.once('value', snapshot => {
            snapshot.child('friends').forEach(child => {
                firebase.database().ref(`users/${child.val()}`).once('value', friendSnap => {
                    this.props.pushFriendsList(friendSnap.val())
                    // pushes an entire object when only needs just the name; fix to save dowloading excess data
                })
            })
        })
    }

    _refreshing() {
        this.props.refreshFriendsList(true);
        this.props.eraseFriendsList();
        this.pullFriendsListDataFromDatabase();
        this.props.refreshFriendsList(false)
    }

    returnUserBannerColor() {
        let color = this.props.color;
        switch(color) {
            case 'Red':
                return '#dd2846'
            case 'Blue':
                return '#3333cc'
            case 'Green': 
                return '#2c934c'
            case 'Purple':
                return '#642eaa'
            case 'Pink':
                return '#cc66cc'
            case 'White':
                return '#f4f4f4'
            case 'Black':
                return '#373737'
            case 'Orange':
                return '#ff9900'
            case 'Yellow': 
                return '#ddd82a'
            default:
                return '#3333cc'
        }
    }

    render() {
        return (
            <View>
                <StatusBar barStyle="light-content" />
                <LinearGradient
                style={styles.gradient}
                colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
                >
                    <SafeAreaView>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Friends</Text>
                            <View style={styles.settings}>
                                <TouchableOpacity style={{width: 50, alignItems: 'center'}}>
                                    <Ionicons name={'md-add'} size={30} color={'#FFFFFF'} style={{paddingLeft: 10}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.flatlist}>
                            <FlatList
                                refreshControl={
                                <RefreshControl
                                    refreshing={this.props.refreshing}
                                    onRefresh={() => {this._refreshing()}}
                                />
                                }
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.contentContainerStyle}
                                data={this.props.friends}
                                renderItem={({item}) => <FriendsCard key={item.name} name={item.name} />}
                            />
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </View>
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
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: Variables.deviceWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 50,
    },
    gradient: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight,
    },
    settings: {
        marginRight: 20,
        justifyContent: 'flex-end'
    },
    headerTitle: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 30,
        color: '#ffffff',
        marginLeft: 20,
        marginRight: 'auto',
    },
    contentContainerStyle: {
        paddingBottom: 500, 
    },
    flatlist: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    friendCount: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 30,
        color: '#ffffff',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Friends));
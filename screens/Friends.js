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
                    <SafeAreaView>
                        
                        <View style={styles.header}>

                            <TouchableOpacity style={{paddingLeft: 15}} onPress={() => {this.props.navigation.openDrawer()}}>
                                <Ionicons name={'ios-menu'} size={40} color={'#ffffff'}/>
                            </TouchableOpacity>

                            <Text style={styles.headerTitle}>Friends</Text>

                            <View style={styles.settings}>
                                <TouchableOpacity style={{width :50, alignItems: 'center'}}>
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
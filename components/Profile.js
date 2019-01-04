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
    StatusBar
} from 'react-native';

import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';
import { withNavigation } from 'react-navigation';
import firebase from '../config/Firebase';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text, Button, List, ListItem, } from 'native-base';
import {LinearGradient} from 'expo'

import Variables from '../config/Variables';
import COLORS from '../config/Colors.js';
import { Ionicons } from "@expo/vector-icons";

import { connect } from 'react-redux';
import { updateName, updateBio, updateAge, updateHandle, updateKarma, updateModal, updateGender, updateInterest, updateLocation, updateColor, updatePicture } from '../redux/actions.js';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePictureURL: '',
        };
    }

    componentWillMount() {
        if(this.props.currentUserProfile) {
            this._initialReadFromDatabase();
            this.getProfilePicture();
        }
        else {
            this._accessSelectedUserProfile();
        }
    }

    returnUserBannerColor() {
        let color = this.props.color;
        switch(color) {
            case 'Red':
                return 'red'
            case 'Blue':
                return 'blue'
            case 'Green': 
                return '#2c934c'
            case 'Purple':
                return 'purple'
            case 'Pink':
                return 'pink'
            case 'White':
                return 'white'
            case 'Black':
                return 'black'
            default:
                return '#3333cc'
        }
    }

    returnUserIconPicture() {
        let color = this.props.color;
        switch(color) {
            case 'Red':
                return 'red'
            case 'Blue':
                return 'blue'
            case 'Green': 
                return '#2c934c'
            case 'Purple':
                return 'purple'
            case 'Pink':
                return 'pink'
            case 'White':
                return 'white'
            case 'Black':
                return 'black'
            default:
                return '#3333cc'
        }
    }

    getProfilePicture() {
        let uid = firebase.auth().currentUser.uid
        let imageRef = firebase.storage().ref(`users/${uid}/profile-picture`)
        imageRef.getDownloadURL().then(url => {
            this.props.updatePicture(url)
        }).catch(error => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            console.log('File doesnt exist')
        }          
    })}

    _initialReadFromDatabase() {
        /* Input: user data from db   Output: redux state of user data */
        let uid = firebase.auth().currentUser.uid;
        let profile = firebase.database().ref(`/users/${uid}`);

        profile.once('value').then(snapshot => {
            snapshot.forEach((child) => {
                switch(child.key) {
                    case 'name':
                        this.props.updateName(child.val())
                        break;
                    case 'handle':
                        this.props.updateHandle(child.val())
                        break;
                    case 'karma':
                        this.props.updateKarma(child.val())
                        break;
                    case 'bio':
                        this.props.updateBio(child.val())
                        break;
                    case 'age':
                        let bday = child.child('2');
                        let currentDate = new Date();
                        let result = currentDate.getFullYear().valueOf() - bday.val();
                        this.props.updateAge(result)
                        break;
                    case 'gender':
                        this.props.updateGender(child.val())
                        break;
                    case 'location':
                        this.props.updateLocation(child.val())
                        break;
                    case 'interest':
                        this.props.updateInterest(child.val())
                        break;
                    case 'color':
                        this.props.updateColor(child.val())
                        break;
                    default:
                        console.log('Could not find matching data for profile... continuing')
                        break;
                }  
            })
        })
    }
    
    _accessSelectedUserProfile() {
        /* 
            Input: user data from db   Output: redux state of user data
            Similar to _initialReadFromDatabase but for viewing other user's profiles
        */
        
        let userUID = this.props.uid;
        let selectedUser = firebase.database().ref(`/users/${userUID}`);

        selectedUser.once('value').then(snapshot => {
            snapshot.forEach((child) => {
                switch(child.key) {
                    case 'name':
                        this.props.updateName(child.val())
                        break;
                    case 'handle':
                        this.props.updateHandle(child.val())
                        break;
                    case 'karma':
                        this.props.updateKarma(child.val())
                        break;
                    case 'bio':
                        this.props.updateBio(child.val())
                        break;
                    case 'age':
                        this.props.updateAge(child.val())
                        break;
                    default:
                        console.log('Could not find matching data for selected user... continuing')
                        break;
                }  
            })
        })
    }

    _updateDatabaseProfileInfo(data, type) {
        /* 
            Input: Redux state of profile data  Output: send profile data to db
            Type: 'name', 'handle', 'karma', 'bio', 'age'
        */

        let uid = firebase.auth().currentUser.uid;
        let profile = firebase.database().ref(`/users/${uid}`);

        switch(type) {
            case 'name':
                profile.update({
                    name: data
                })
                break;
            case 'handle':
                profile.update({
                    handle: data
                })
                break;
            case 'karma':
                profile.update({
                    karma: data
                })
                break;
            case 'bio':
                profile.update({
                    bio: data
                })
                break;
            case 'age':
                profile.update({
                    age: data
                })
                break;
            default: 
                console.log('Upload request to database unknown... continuing')
                break;
        } 
    }

    _signOutAsync = async () => {
        firebase.auth().signOut().then( () => {
             AsyncStorage.clear().then(async () => {
                this.props.navigation.navigate('SignUp');
            }).catch(function(error){
                console.log(error);
            })
          }).catch(function(error) {
            console.log(error);
          });
    };

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
                            <Text style={styles.headerTitle}>Profile</Text>
                            <View style={styles.settings}>
                                <TouchableOpacity >
                                    <Ionicons name={'md-settings'} size={30} color={'#FFFFFF'} style={{paddingLeft: 10}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={{height: Variables.deviceHeight}}>
                            <View style={styles.pictureAndBioContainer}>
                                <View style={[styles.banner, {backgroundColor: this.returnUserBannerColor()}]}/>
                                {
                                    this.props.picture === '' ? 
                                    <Image 
                                        style={styles.profilePicture}
                                        source={require('../assets/login/defaultProfilePicture.png')}
                                    /> :
                                    <Image 
                                        style={styles.profilePicture}
                                        source={{uri: this.props.picture}}
                                    />  
                                }
                                <Text style={styles.bio}>"{this.props.bio}"</Text>
                            </View>
                            <View>
                                <Text style={styles.name}>{this.props.name}, {this.props.age}</Text>
                                <Text style={styles.handle}>@{this.props.handle}</Text>
                                <Text style={styles.karma}>BarScore: {this.props.profilePictureURL}</Text>
                            </View>
                            <View>
                                {
                                    this.props.location ? 
                                    <View style={styles.location}>
                                        <Image 
                                            style={styles.icon}
                                            source={require('../assets/signup/location_text_box.png')}
                                        />
                                        <Text style={styles.locationText}>{this.props.location}</Text>
                                    </View>
                                    : null
                                }
                                {
                                    this.props.gender ? 
                                    <View style={styles.gender}>
                                        <Image 
                                            style={styles.icon}
                                            source={require('../assets/signup/gender_text_box.png')}
                                        />
                                        <Text style={styles.genderText}>{this.props.gender}</Text>
                                    </View>
                                    : null
                                }
                                {
                                    this.props.interest ? 
                                    <View style={styles.interest}>
                                        <Image 
                                            style={styles.icon}
                                            source={require('../assets/signup/interested_text_box.png')}
                                        />
                                        <Text style={styles.interestText}>{this.props.interest}</Text>
                                    </View>
                                    : null
                                }
                            </View>
                            <View>
                                <Text style={styles.favoriteBar}>Favorite Bar</Text>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </LinearGradient>
            </View>
        );
    }   
}

// Extract data from store
const mapStateToProps = state => ({
    name: state.profileReducer.name,
    bio: state.profileReducer.bio,
    age: state.profileReducer.age,
    handle: state.profileReducer.handle,
    karma: state.profileReducer.karma,
    modal: state.profileReducer.modal,
    gender: state.profileReducer.gender,
    interest: state.profileReducer.interest,
    location: state.profileReducer.location,
    color: state.profileReducer.color,
    picture: state.profileReducer.picture,
})
  
// Dispatch data to store
const mapDispatchToProps = {
    updateName,
    updateBio,
    updateAge,
    updateHandle,
    updateKarma,
    updateModal,
    updateGender,
    updateLocation,
    updateInterest,
    updateColor,
    updatePicture,
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
    profilePicture: {
        borderRadius: 90,
        width: 180,
        height: 180,
    },
    pictureAndBioContainer: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
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
    banner: {
        height: 120,
        width: Variables.deviceWidth,
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute'
    },
    bio: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        color: '#ffffff',
        flexWrap: 'wrap',
        flex: 1,
        alignSelf: 'center',
    },
    name: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 30,
        marginLeft: 20,
        color: 'white'
    },
    handle: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 20,
        color: 'white'
    },
    karma: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 40,
        color: 'white'
    },
    icon: {
        width: 50,
        height: 50,
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
    },
    gender: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
    },
    interest: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
    },
    locationText: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
    genderText: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
    interestText: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
    favoriteBar: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 30,
        marginLeft: 20,
        marginTop: 40,
        color: 'white'
    }
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Profile));
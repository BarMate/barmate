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

import getTheme from '../../native-base-theme/components';
import Common from '../../native-base-theme/variables/commonColor';
import { withNavigation } from 'react-navigation';
import firebase from '../../config/Firebase';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text, Button, List, ListItem, } from 'native-base';
import {LinearGradient} from 'expo'

import Variables from '../../config/Variables';
import COLORS from '../../config/Colors.js';
import { Ionicons } from "@expo/vector-icons";

import { connect } from 'react-redux';
import { updateName, updateBio, updateAge, updateHandle, updateKarma, updateModal, updateGender, updateInterest, updateLocation, updateColor, updatePicture } from '../../redux/actions.js';

class CurrentUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePictureURL: '',
        };
    }

    componentWillMount() {
        if(this.props.uid) {
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

    returnUserIconPicture(type) {
        let color = this.props.color;
        switch(type) {
            case 'Location': {
                switch(color) {
                    case 'Red': {
                        return (
                                <Image 
                                    style={styles.icon}
                                    source={require('../../assets/profile/red_glyph/location.png')}
                                />
                            )
                    }
                    case 'Blue': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/location.png')}
                            />
                        )
                    }
                    case 'Green': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/green_glyph/location.png')}
                            />
                        )
                    }
                    case 'Purple': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/purple_glyph/location.png')}
                            />
                        )
                    }
                    case 'Pink': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/pink_glyph/location.png')}
                            />
                        )
                    }
                    case 'White': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/white_glyph/location.png')}
                            />
                        )
                    }
                    case 'Black': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/black_glyph/location.png')}
                            />
                        )
                    }
                    case 'Orange': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/orange_glyph/location.png')}
                            />
                        )
                    }
                    case 'Yellow': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/yellow_glyph/location.png')}
                            />
                        )
                    }
                    default: {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/location.png')}
                            />
                        )
                    }
                }
            }
            case 'Gender': {
                switch(color) {
                    case 'Red': {
                        return (
                                <Image 
                                    style={styles.icon}
                                    source={require('../../assets/profile/red_glyph/gender.png')}
                                />
                            )
                    }
                    case 'Blue': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Green': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/green_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Purple': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/purple_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Pink': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/pink_glyph/gender.png')}
                            />
                        )
                    }
                    case 'White': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/white_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Black': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/black_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Orange': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/orange_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Yellow': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/yellow_glyph/gender.png')}
                            />
                        )
                    }
                    default: {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/gender.png')}
                            />
                        )
                    }
                }                
            }
            case 'Interest': {
                switch(color) {
                    case 'Red': {
                        return (
                                <Image 
                                    style={styles.icon}
                                    source={require('../../assets/profile/red_glyph/interest.png')}
                                />
                            )
                    }
                    case 'Blue': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Green': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/green_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Purple': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/purple_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Pink': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/pink_glyph/interest.png')}
                            />
                        )
                    }
                    case 'White': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/white_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Black': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/black_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Orange': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/orange_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Yellow': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/yellow_glyph/interest.png')}
                            />
                        )
                    }
                    default: {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/interest.png')}
                            />
                        )
                    }
                }                
            }
            default: 
                break;
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
        console.log('My profile')
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
        const { navigation } = this.props;
        let userUID = navigation.getParam('uid');
        let selectedUser = firebase.database().ref(`/users/${userUID}`);
        console.log('Other profile')
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
                                        source={require('../../assets/login/defaultProfilePicture.png')}
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
                                <Text style={styles.karma}>BarScore: {this.props.karma}</Text>
                            </View>
                            <View>
                                {
                                    this.props.location ? 
                                    <View style={styles.location}>
                                        {this.returnUserIconPicture('Location')}
                                        <Text style={styles.locationText}>{this.props.location}</Text>
                                    </View>
                                    : null
                                }
                                {
                                    this.props.gender ? 
                                    <View style={styles.gender}>
                                        {this.returnUserIconPicture('Gender')}
                                        <Text style={styles.genderText}>{this.props.gender}</Text>
                                    </View>
                                    : null
                                }
                                {
                                    this.props.interest ? 
                                    <View style={styles.interest}>
                                        {this.returnUserIconPicture('Interest')}
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
        marginLeft: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CurrentUserProfile));
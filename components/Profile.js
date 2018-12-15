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
    ScrollView
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
import { updateName, updateBio, updateAge, updateHandle, updateKarma, updateModal } from '../redux/actions.js';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSettingsVisible: false,
            modalEditVisibles: false,
        };
    }

    componentWillMount() {
        if(this.props.currentUserProfile) {
            this._initialReadFromDatabase();
        }
        else {
            this._accessSelectedUserProfile();
        }
    }

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
                        this.props.updateAge(child.val())
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

    setSettingsModalVisible(visible) {
        this.setState({modalSettingsVisible: visible});
    }

    setEditModalVisible(visible) {
        this.setState({modalEditVisibles: visible});
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
            <StyleProvider style={getTheme(Common)}>
                <Container>
                    <Header>
                        <Left style={{ flex: 1 }}>
                        </Left>
                        <Body style={{ flex: 3, justifyContent: 'center' }}>
                            <Title style={{ alignSelf: 'center' }}>Profile</Title>
                        </Body>
                        <Right style={{ flex: 1 }}>
                        {this.props.currentUserProfile ? null : <TouchableOpacity onPress={() => {this.props.updateModal(false)}}>
                                <Ionicons name={'ios-close'} size={30} color={'#FFFFFF'} style={{paddingRight: 10}} />
                            </TouchableOpacity>}
                        </Right>
                    </Header>
                    <Content scrollEnabled={false}>
                        <LinearGradient style={styles.gradient} colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                            <ScrollView>
                                <View style={styles.container}>
                                    <Image style={styles.profilePicture} source={require('../assets/global/profile_picture_template.png')} />
                                    <Text style={styles.profileName}>{this.props.name}</Text>
                                    <Text style={styles.profileHandle}>@{this.props.handle}</Text>
                                    <View style={{width: Variables.deviceWidth, height: 25, flexDirection: 'row', marginTop: 30}}>
                                        <Text style={styles.profileAge}>{this.props.age}</Text>
                                        <Text style={styles.profileKarma}>{this.props.karma}</Text>
                                    </View>
                                    <View style={{width: Variables.deviceWidth, height: 25, flexDirection: 'row', marginTop: 5}}>
                                        <Text style={styles.profileAge_subtitle}>years old</Text>
                                        <Text style={styles.profileKarma_subtitle}>points</Text>
                                    </View>
                                    <Text style={styles.profileBio}>"{this.props.bio}"</Text>
                                </View>
                            </ScrollView>
                        </LinearGradient>
                    </Content>
                </Container>
            </StyleProvider>
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
})
  
// Dispatch data to store
const mapDispatchToProps = {
    updateName,
    updateBio,
    updateAge,
    updateHandle,
    updateKarma,
    updateModal,
}
  
const styles = StyleSheet.create({
    container: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight * 1.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    gradient: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight,
    },
    profilePicture: {
        marginTop: 50,
        width: 250,
        height: 250,
    },
    profileName: {
        fontSize: 35,
        fontFamily: 'HkGrotesk_Bold',
        marginTop: 10,
    },
    profileHandle: {
        fontSize: 20,
        fontFamily: 'HkGrotesk_Medium',
        marginTop: 5,
    },
    profileAge: {
        flex: 1,
        fontSize: 25,
        fontFamily: 'HkGrotesk_Medium',
        marginLeft: 90,
    },
    profileKarma: {
        flex: 1,
        fontSize: 25,
        fontFamily: 'HkGrotesk_Medium',  
        marginLeft: 80,
    },
    profileAge_subtitle: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'HkGrotesk_Medium',
        marginLeft: 65,
    },
    profileKarma_subtitle: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'HkGrotesk_Medium',  
        marginLeft: 65,
    },
    profileBio: {
        fontSize: 20,
        fontFamily: 'HkGrotesk_Italic',
        marginTop: 50,
    }
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Profile));
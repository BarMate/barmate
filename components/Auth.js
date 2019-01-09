//=============================================================
// Auth.js
//
// Handles user log in and navigation between logged in and
// logged out state.
//
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================

import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import { withNavigation } from "react-navigation";

import { connect } from 'react-redux';
import { updateName, updateBio, updateAge, updateHandle, updateKarma, updateModal, updateGender, updateInterest, updateLocation, updateColor, updatePicture } from '../redux/actions/CurrentUserProfileActions'

import firebase from "../config/Firebase.js";

class AuthLoadingScreen extends React.Component {

  constructor() {
    super();
    this._bootstrapAsync();
    this.state = {
      loading: "",
      success: "",
      error: ""
    };
  }

  static navigationOptions = {
    header: null,
    headerMode: "none"
  };

  _getProfilePicture() {
    let uid = firebase.auth().currentUser.uid
    console.log(`uid: ${uid}`)
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
    profile.once('value', snapshot => {
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
  _determineUserAuthAndLoadData(token) {
    if(token) {
      this._initialReadFromDatabase();
      this._getProfilePicture();
      this.props.navigation.navigate("Main");
    }
    else {
      this.props.navigation.navigate("Start")
    }
  }


  _bootstrapAsync = async () => {
    try {
      Expo.Font.loadAsync({
        Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
        HkGrotesk_Bold: require("../assets/fonts/HkGrotesk/HkGrotesk-Bold.ttf"),
        HkGrotesk_Italic: require("../assets/fonts/HkGrotesk/HkGrotesk-Italic.ttf"),
        HkGrotesk_Medium: require("../assets/fonts/HkGrotesk/HkGrotesk-Medium.ttf"),
        HkGrotesk_Regular: require("../assets/fonts/HkGrotesk/HkGrotesk-Regular.ttf"),
        HkGrotesk_Light: require("../assets/fonts/HkGrotesk/HkGrotesk-Light.ttf"),
        HkGrotesk_LightItalic: require("../assets/fonts/HkGrotesk/HkGrotesk-LightItalic.ttf"),
      }).then(async response => {
        firebase.auth().onAuthStateChanged(userToken => {
          this._determineUserAuthAndLoadData(userToken);
        });
      });
    } catch (error) {
      console.log("error loading icon fonts", error);
    }
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator/>
        <StatusBar barStyle="light-content"/>
      </View>
    );
  }
}

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

export default connect(null, mapDispatchToProps)(withNavigation(AuthLoadingScreen));

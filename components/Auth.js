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
          this.props.navigation.navigate(userToken ? "Start" : "Start");
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
          justifyContent: "center"
        }}>
        <ActivityIndicator/>
        <StatusBar barStyle="light-content"/>
      </View>
    );
  }
}

export default withNavigation(AuthLoadingScreen);

/* 
    AuthContainer.js
    
    First screen of the app that determines auth state
    Should load things here that need loaded beforehand (fonts, images, etc)
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Font, Asset } from 'expo';

import Auth from "./Auth";
import styles from "./style";

class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
      // add async flags here
    };
  }

  componentDidMount() {
      this._loadAssets();
  }

  async _loadAssets() {
    await Font.loadAsync({
      HkGrotesk_Bold: require("../../assets/fonts/HkGrotesk/HkGrotesk-Bold.ttf"),
      HkGrotesk_BoldItalic: require("../../assets/fonts/HkGrotesk/HkGrotesk-BoldItalic.ttf"),
      HkGrotesk_Italic: require("../../assets/fonts/HkGrotesk/HkGrotesk-Italic.ttf"),
      HkGrotesk_Light: require("../../assets/fonts/HkGrotesk/HkGrotesk-Light.ttf"),
      HkGrotesk_LightItalic: require("../../assets/fonts/HkGrotesk/HkGrotesk-LightItalic.ttf"),
      HkGrotesk_Medium: require("../../assets/fonts/HkGrotesk/HkGrotesk-Medium.ttf"),
      HkGrotesk_MediumItalic: require("../../assets/fonts/HkGrotesk/HkGrotesk-MediumItalic.ttf"),
      HkGrotesk_Regular: require("../../assets/fonts/HkGrotesk/HkGrotesk-Regular.ttf"),
      HkGrotesk_SemiBold: require("../../assets/fonts/HkGrotesk/HkGrotesk-SemiBold.ttf"),
      HkGrotesk_SemiBoldItalic: require("../../assets/fonts/HkGrotesk/HkGrotesk-SemiBoldItalic.ttf")
    });

    await Asset.loadAsync([require('../../assets/logo_final.png')]);

    this.props.navigation.navigate('LoginContainer');
  }

  render() {
    return <Auth style={styles} />;
  }
}

export default AuthContainer;

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Font } from 'expo';

import Login from './Login';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
    };
  }

  // Lifecycle methods, etc...
  async componentDidMount() {
    // Will be put into the auth screen keeping here for now
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
      HkGrotesk_SemiBoldItalic: require("../../assets/fonts/HkGrotesk/HkGrotesk-SemiBoldItalic.ttf"),
    })

    this.setState({fontloaded: true})
  }

  render() {
    return (
      this.state.fontloaded == false ? <Text>Loading...</Text> : <Login />
    );
  }
}

export default LoginContainer;

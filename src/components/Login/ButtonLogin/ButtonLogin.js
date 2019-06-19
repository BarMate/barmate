import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { Ionicons } from '@expo/vector-icons'
import firebase from '../../../config/APIs/Firebase/firebase';

import styles from './styles';

class ButtonLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1.0),
      loading: false,
      userData: {}
    };
  }

  _determineButtonState() {
    // Display correct text or icon for the state of the button
    if (this.state.loading == true) {
      return <ActivityIndicator size="small" color="#ffffff" />;
    } else {
      return <Text style={styles.buttonText}>Log In</Text>;
    }
  }

  _loginUser() {
    // Update UI state
    this.setState({loading: true});

    // Sign user in with email and password
    firebase.auth().signInWithEmailAndPassword('jcontume@kent.edu', 'Kentstark001!')
    .catch(error => {
      Alert.alert(
        `Couldn't log in`,
        `It looks like your email or password is incorrect. Please try again.`,
      )
      console.log(`Unable to sign user in. Err code: ${error.code}`)
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <TouchableWithBounce onPress={() => {this._loginUser()}} style={styles.rootContainer}>
        {this._determineButtonState()}
      </TouchableWithBounce>
    );
  }
}

export default ButtonLogin;

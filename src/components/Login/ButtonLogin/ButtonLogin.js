import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { Ionicons } from '@expo/vector-icons'

class ButtonLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1.0),
      loading: false,
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

  async _loginUserAsync() {
    // Log user into app
    this.setState({loading: true});
  }

  render() {
    return (
      <TouchableWithBounce onPress={() => {this._loginUserAsync()}} style={styles.rootContainer}>
        {this._determineButtonState()}
      </TouchableWithBounce>
    );
  }
}

const styles = StyleSheet.create({
    rootContainer: {
        width: 300,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: '#302C9E',
        marginTop: 30,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        paddingLeft: 10,
        fontFamily: 'HkGrotesk_Bold',
    }
})

export default ButtonLogin;

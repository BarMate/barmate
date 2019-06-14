import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { Ionicons } from '@expo/vector-icons'

class ButtonSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        scale: new Animated.Value(1.0),
    };
    }

  render() {
    return (
        <TouchableWithBounce style={styles.rootContainer}>
            <Text style={styles.buttonText}>
                Sign up
            </Text>
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
        fontFamily: 'HkGrotesk_Medium',
    }
})

export default ButtonSignup;

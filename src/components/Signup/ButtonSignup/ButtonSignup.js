import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { Ionicons } from '@expo/vector-icons'
import styles from './styles';

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

export default ButtonSignup;

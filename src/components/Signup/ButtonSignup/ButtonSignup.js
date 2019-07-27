import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { Ionicons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';

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
        <TouchableWithBounce onPress={() => this.props.navigation.push('SignupPage2Container')} style={styles.rootContainer}>
            <Text style={styles.buttonText}>Sign up</Text>
        </TouchableWithBounce>
    );
  }
}

export default withNavigation(ButtonSignup);

import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { Ionicons } from '@expo/vector-icons'

import styles from './styles';

class ButtonLoginGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
    }

  render() {
    return (
        <TouchableWithBounce style={styles.rootContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name={'logo-google'} size={25} color={'#3B5998'} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                  Continue with Google
              </Text>
            </View>
        </TouchableWithBounce>
    );
  }
}

export default ButtonLoginGoogle;

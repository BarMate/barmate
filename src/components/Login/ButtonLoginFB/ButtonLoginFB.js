import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { Ionicons } from '@expo/vector-icons'
import styles from './styles';

class ButtonLoginFB extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
    }

  render() {
    return (
        <TouchableWithBounce onPress={this.props.onPress} style={styles.rootContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name={'logo-facebook'} size={25} color={'#3B5998'} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                  Continue with Facebook
              </Text>
            </View>
        </TouchableWithBounce>
    );
  }
}

export default ButtonLoginFB;

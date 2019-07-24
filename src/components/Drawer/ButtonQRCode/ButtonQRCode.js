import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

class ButtonQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.iconContainer}>
        <Ionicons name={"md-qr-scanner"} size={styles.iconSize} color={"#ffffff"}/>
      </View>
    );
  }
}

export default ButtonQRCode;

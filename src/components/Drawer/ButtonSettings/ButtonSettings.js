import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

class ButtonSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.iconContainer}>
        <Ionicons name={"ios-settings"} size={styles.iconSize} color={"#ffffff"}/>
      </View>
    );
  }
}

export default ButtonSettings;

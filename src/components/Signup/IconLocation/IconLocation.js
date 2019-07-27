import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

class IconLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.root}>
        <Ionicons name={'ios-navigate'} color={'#000000'} size={styles.iconSize} />
        <Text style={styles.bodyText}>BarMate needs your location for certain features of the app to work.</Text>
      </View>
    );
  }
}

export default IconLocation;

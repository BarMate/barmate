import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

class ButtonHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity style={styles.rootContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={'md-beer'} size={styles.iconSize} color={'#ffffff'} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Home</Text>
          </View>
          <View style={styles.iconContainer}>
            {/**can be used to have another icon if necessary */}
          </View>
        </TouchableOpacity>
    );
  }
}

export default ButtonHome;

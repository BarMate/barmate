import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

class ChooseProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={styles.root}>
        <Ionicons name={'ios-contact'} size={styles.iconSize} color={'#000000'} />
        <Text style={styles.textChoosePicture}>Choose profile picture...</Text>
      </TouchableOpacity>
    );
  }
}

export default ChooseProfilePicture;

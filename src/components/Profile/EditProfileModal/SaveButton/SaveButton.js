import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import {  } from 'react-native-gesture-handler';

class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={[styles.root, this.props.style]}>
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
    );
  }
}

export default SaveButton;

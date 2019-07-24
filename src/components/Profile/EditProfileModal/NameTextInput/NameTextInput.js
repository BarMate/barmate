import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class NameTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.rootContainer}>
            <TextInput 
                style={styles.nameTextInput}
                placeholder={'Name'}
            />
        </View>
    );
  }
}

export default NameTextInput;

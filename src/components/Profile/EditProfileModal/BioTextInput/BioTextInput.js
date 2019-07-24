import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class BioTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <TextInput 
            style={styles.bioTextInput}
            placeholder={'Bio'}
            multiline={true}
        />
      </View>
    );
  }
}

export default BioTextInput;

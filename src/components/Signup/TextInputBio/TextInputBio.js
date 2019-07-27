import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class TextInputBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TextInput 
        style={styles.root}
        placeholder={'Bio'}
        multiline={true}
        maxLength={128}
      />
    );
  }
}

export default TextInputBio;

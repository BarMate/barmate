import React, { Component } from 'react';
import { View, Text, TextInput, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styles from './styles';

class DefaultTextInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return (
        <TextInput
            style={[this.props.style, styles.rootContainer]}
            placeholder={this.props.children}
            placeholderTextColor={'#707070'}
        />
    );
  }
}

export default DefaultTextInputForm;

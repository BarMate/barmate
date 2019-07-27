import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class TextInputEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TextInput 
            style={[styles.rootContainer, this.props.style]}
            placeholder={'Email'}
            placeholderTextColor={'#707070'}
            value={this.props.loginEmailValue}
            keyboardType={'email-address'}
            keyboardAppearance={'dark'}
        />
    );
  }
}

export default TextInputEmail;

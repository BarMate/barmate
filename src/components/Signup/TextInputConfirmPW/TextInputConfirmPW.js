import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class TextInputConfirmPW extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TextInput 
            style={[styles.rootContainer, this.props.style]}
            placeholder={'Confirm Password'}
            placeholderTextColor={'#707070'}
            value={this.props.loginPasswordValue}
            secureTextEntry={true}
            keyboardAppearance={'dark'}
        />
    );
  }
}

export default TextInputConfirmPW;

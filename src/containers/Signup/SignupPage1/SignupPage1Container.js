import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SignupPage1 from './SignupPage1';

class SignupPage1Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SignupPage1 />
    );
  }
}

export default SignupPage1Container;

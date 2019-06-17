import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Messages from './Messages';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Messages />
    );
  }
}

export default MessagesContainer;

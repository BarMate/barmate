import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Messages from './Messages';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stub: [{},{},{},{},{},{},{},{}]
    };
  }

  render() {
    return (
      <Messages stub={this.state.stub} />
    );
  }
}

export default MessagesContainer;

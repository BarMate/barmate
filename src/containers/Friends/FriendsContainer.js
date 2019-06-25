
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Friends from './Friends';

class FriendsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Friends />
    );
  }
}

export default FriendsContainer;

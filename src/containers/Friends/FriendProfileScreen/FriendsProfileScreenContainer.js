import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FriendsProfileScreen from './FriendsProfileScreen';

class FriendsProfileScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <FriendsProfileScreen />
    );
  }
}

export default FriendsProfileScreenContainer;

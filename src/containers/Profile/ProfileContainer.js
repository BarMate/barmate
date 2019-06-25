import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Profile from './Profile';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Profile />
    );
  }
}

export default ProfileContainer;

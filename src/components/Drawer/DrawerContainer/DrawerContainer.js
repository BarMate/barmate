import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { ButtonHome, ButtonFriends, ButtonProfile, ButtonSettings, ProfilePicture, UserInfo, ButtonQRCode } from '../index';

import styles from './styles';

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.topContainer}>
          <ProfilePicture />
          <UserInfo />
        </View>
        <View style={styles.bottomContainer}>
            <ButtonHome />
            <ButtonProfile />
            <ButtonFriends />
        </View>
        <View style={styles.extraIconContainer}>
          <ButtonSettings />
        </View>
      </View>
    );
  }
}

export default DrawerContainer;

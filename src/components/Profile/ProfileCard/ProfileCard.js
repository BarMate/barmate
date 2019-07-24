import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { UserInfoSubView, FavoriteBarSubView } from '../index';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <UserInfoSubView />
        <FavoriteBarSubView />
      </View>
    );
  }
}

export default ProfileCard;
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import UserInfoSubView from '../UserInfoSubView/UserInfoSubView';

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
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
        <Text style={styles.test}> ProfileCard </Text>
      </View>
    );
  }
}

export default ProfileCard;

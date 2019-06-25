import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.name}>Andrew</Text>
        <Text style={styles.handle}>@Glauberman</Text>
      </View>
    );
  }
}

export default UserInfo;

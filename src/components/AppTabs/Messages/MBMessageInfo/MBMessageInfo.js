import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class MBMessageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.name}>Joe</Text>
        <Text style={styles.messagePreview}>Hello this is a test message XD</Text>
      </View>
    );
  }
}

export default MBMessageInfo;

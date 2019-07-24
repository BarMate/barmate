import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import styles from './styles';

class ShowPlansToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>Show plans on profile</Text>
        <Switch 
            style={styles.switch}
        />
      </View>
    );
  }
}

export default ShowPlansToggle;

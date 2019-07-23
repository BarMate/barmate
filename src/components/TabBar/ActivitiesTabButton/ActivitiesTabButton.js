import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import styles from './styles';
class ActivitiesTabButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={styles.activitiesTab} onPress={() => this.props.navigation.navigate('InsideNav')}>
        <Ionicons
          name={"ios-grid"}
          size={styles.iconSize}
          color={"rgba(255,255,255,0.6)"}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ActivitiesTabButton);

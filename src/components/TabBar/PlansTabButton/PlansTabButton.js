import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

class PlansTabButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity
          style={styles.plansTab}
          onPress={() => this.props.navigation.navigate("PlansNav")}
        >
          <Ionicons
            name={"ios-apps"}
            size={styles.iconSize}
            color={"rgba(255,255,255,0.6)"}
          />
        </TouchableOpacity>
    );
  }
}

export default withNavigation(PlansTabButton);

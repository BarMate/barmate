import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

import { Ionicons } from '@expo/vector-icons';
import { withNavigation, NavigationActions } from 'react-navigation';

class ButtonClose extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.dispatch(NavigationActions.back())} style={styles.rootContainer}>
        <Ionicons name={'ios-close'} size={styles.iconSize} color={'#000000'} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ButtonClose);

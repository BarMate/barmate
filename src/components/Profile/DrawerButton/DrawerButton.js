import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

class DrawerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={styles.iconContainer}>
            <Ionicons name={'md-menu'} size={styles.iconSize} color={'#302C9E'} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(DrawerButton);

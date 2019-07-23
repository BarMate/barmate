import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import styles from './styles';

class MessagesTabButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={styles.messagesTab} onPress={() => this.props.navigation.navigate('MessagesNav')}>
        <Ionicons
          name={"ios-chatbubbles"}
          size={styles.iconSize}
          color={"rgba(255,255,255,0.6)"}
        />
      </TouchableOpacity>
    );
  }
}


export default withNavigation(MessagesTabButton);

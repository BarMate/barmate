import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

class ButtonBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.rootContainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name={'ios-arrow-back'} size={styles.iconSize} color={'#000000'} />
                <Text style={styles.backText}> Back</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

export default withNavigation(ButtonBack);

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import styles from './styles';

class ButtonProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.rootContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={'ios-contact'} size={styles.iconSize} color={'#ffffff'} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Profile</Text>
          </View>
          <View style={styles.iconContainer}>
            {/**can be used to have another icon if necessary */}
          </View>
        </TouchableOpacity>
    );
  }
}

export default withNavigation(ButtonProfile);

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigationFocus } from 'react-navigation';

import styles from './styles';

class YourBarsTabButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <TouchableOpacity style={styles.homeTab} onPress={() => this.props.navigation.navigate('YourBarsNav')}>
            {
              this.props.isFocused ?  <Ionicons name={"md-beer"} size={styles.iconSize} color={'#ffffff'} /> :
                                      <Ionicons name={"md-beer"} size={styles.iconSize} color={'rgba(255,255,255,0.3)'} />
            }
        </TouchableOpacity>
    );
  }
}

export default withNavigationFocus(YourBarsTabButton);

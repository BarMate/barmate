import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { BarTemplate } from '../../Global/index';

import styles from './styles';

class FavoriteBarSubView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.headerText}>Favorite Bar</Text>
        <View style={styles.favoriteBarContainer}>
            <BarTemplate />
        </View>
      </View>
    );
  }
}

export default FavoriteBarSubView;

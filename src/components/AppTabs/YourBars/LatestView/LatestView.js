import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import LatestInfo from '../LatestInfo/LatestInfo';
import styles from './styles';

class LatestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        stub: [{}, {}, {}],
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.headerText}>Latest</Text>
        <View style={styles.contentView}>
            <FlatList 
                keyExtractor={(item, index) => String(Math.random())}
                data={this.state.stub}
                renderItem={({item}) => <LatestInfo />}
            />
        </View>
      </View>
    );
  }
}

export default LatestView;

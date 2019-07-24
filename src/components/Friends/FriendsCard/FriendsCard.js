import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import { FriendsListItem, SearchBar } from '../index';

class FriendsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stub: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},]
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
            <SearchBar />
            <FlatList 
                keyExtractor={(item, index) => String(Math.random())}
                data={this.state.stub}
                renderItem={({item}) => <FriendsListItem />}
                contentContainerStyle={styles.flatlist}
            />
      </View>
    );
  }
}

export default FriendsCard;

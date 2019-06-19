import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color="#302C9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#302C9E"
          onChangeText={searchString => {
            this.setState({ searchString });
          }}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

export default SearchBar;

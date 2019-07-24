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
      <View style={styles.rootContainer}>
        <View style={styles.searchBarContainer}>
            <TextInput 
              style={styles.textInput}
              placeholder={'Search'}
            />
            <View style={styles.iconContainer}>
              <Ionicons name={"ios-search"} size={styles.iconSize} color={"#rgba(0,0,0,0.3)"}/>
            </View>
        </View>
      </View>
    );
  }
}

export default SearchBar;

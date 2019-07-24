import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { withNavigation } from 'react-navigation';

class FriendsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photoURL: "https://firebasestorage.googleapis.com/v0/b/barmate-e95b6.appspot.com/o/users%2FdaTEWcFLY5OSYHCcFbFdKKxpf0D3%2Fprofile-picture?alt=media&token=80c8b9ca-5ee8-4ee9-a4e5-75d17329e3c7",
    };
  }

  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={() => this.props.navigation.push('FriendsProfileScreen')}>
        <Image 
            style={styles.image}
            source={{uri: this.state.photoURL}}
        />
        <Text style={styles.name}>Andrew</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(FriendsListItem);

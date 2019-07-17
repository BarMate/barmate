import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

class MBUserPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photoURL: "https://firebasestorage.googleapis.com/v0/b/barmate-e95b6.appspot.com/o/users%2FdaTEWcFLY5OSYHCcFbFdKKxpf0D3%2Fprofile-picture?alt=media&token=80c8b9ca-5ee8-4ee9-a4e5-75d17329e3c7",
    };
  }

  render() {
    return (
      <Image 
          style={styles.rootContainer}
          source={{uri: this.state.photoURL}}
      />
    );
  }
}

export default MBUserPicture;

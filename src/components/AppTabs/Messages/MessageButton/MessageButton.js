import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MBUserPicture, MBMessageInfo } from '../../index';

import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

class MessageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messageStub: {
            photoURL: "https://firebasestorage.googleapis.com/v0/b/barmate-e95b6.appspot.com/o/users%2FdaTEWcFLY5OSYHCcFbFdKKxpf0D3%2Fprofile-picture?alt=media&token=80c8b9ca-5ee8-4ee9-a4e5-75d17329e3c7",
        }
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>

        <View style={styles.imageContainer}>
            <MBUserPicture />
        </View> 

        <View style={styles.infoContainer}>
            <MBMessageInfo />
        </View>

        <View style={styles.arrowContainer}>
            <Ionicons name={'ios-arrow-forward'} size={styles.iconSize} color={'#302C9E'} />
        </View>

      </View>
    );
  }
}

export default MessageButton;

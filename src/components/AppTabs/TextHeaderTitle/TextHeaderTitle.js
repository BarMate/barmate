import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

import firebase from '../../../config/APIs/Firebase/firebase';

class TextHeaderTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Text onPress={() => {firebase.auth().signOut()}} style={styles.header}>{this.props.children}</Text>
    );
  }
}

export default TextHeaderTitle;

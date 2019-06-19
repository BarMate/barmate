import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styles from './styles';

class NoAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={[this.props.style, styles.rootContainer]}>
            <TouchableWithoutFeedback>
                <Text style={styles.text}>Don't have an account? Sign up.</Text>
            </TouchableWithoutFeedback>
        </View>
    );
  }
}

export default NoAccount;

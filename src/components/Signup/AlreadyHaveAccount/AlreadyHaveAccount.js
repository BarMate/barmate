import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

class AlreadyHaveAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback style={[this.props.style, styles.rootContainer]}>
        <Text style={styles.text}>Already have an account? Sign up.</Text>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
    text: {
        color: '#302C9E',
        fontSize: 14,
        fontFamily: 'HkGrotesk_Light',
    },
    rootContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default AlreadyHaveAccount;

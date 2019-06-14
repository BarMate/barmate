import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
    text: {
        color: '#302C9E',
        fontSize: 12,
    },
    rootContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'HkGrotesk_Light',
    },
})
export default NoAccount;

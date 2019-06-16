import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

class TroubleLoggingIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <View style={[this.props.style, styles.rootContainer]}>
      <TouchableWithoutFeedback>
        <Text style={styles.text}>Trouble Logging In?</Text>
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
        paddingBottom: 5,
        fontFamily: 'HkGrotesk_Light',
        paddingTop: 20,
    },
})
export default TroubleLoggingIn;

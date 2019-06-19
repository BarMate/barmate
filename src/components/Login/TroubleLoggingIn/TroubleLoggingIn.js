import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';

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


export default TroubleLoggingIn;

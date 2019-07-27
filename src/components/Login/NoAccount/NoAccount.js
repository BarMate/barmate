import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styles from './styles';
import { withNavigation } from 'react-navigation';

class NoAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={[this.props.style, styles.rootContainer]}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.push('SignupStack')}>
                <Text style={styles.text}>Don't have an account? Sign up.</Text>
            </TouchableWithoutFeedback>
        </View>
    );
  }
}

export default withNavigation(NoAccount);

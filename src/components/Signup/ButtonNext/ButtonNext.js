import React, { Component } from "react";
import { View, Text } from "react-native";
import { TouchableWithBounce } from '../../Global/index';
import { withNavigation } from 'react-navigation';

import styles from './styles';

class ButtonNext extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableWithBounce style={[this.props.style, styles.rootContainer]} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableWithBounce>
    );
  }
}

export default withNavigation(ButtonNext);

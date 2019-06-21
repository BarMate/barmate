import React, { Component } from "react";
import { View, Text } from "react-native";
import { TouchableWithBounce } from '../../Global/index';

import styles from './styles';

class ButtonNext extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableWithBounce style={styles.rootContainer}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableWithBounce>
    );
  }
}

export default ButtonNext;

import React, { Component } from "react";
import { View, Text } from "react-native";
import { TouchableWithBounce } from '../../Global/index';

import styles from "./styles";

class ButtonAllowLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableWithBounce style={styles.buttonAllowLocation}>
        <Text style={styles.textAllowLocation}>Allow Location Access</Text>
      </TouchableWithBounce>
    );
  }
}

export default ButtonAllowLocation;

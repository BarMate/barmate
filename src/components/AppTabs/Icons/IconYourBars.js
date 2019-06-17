import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class IconYourBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Ionicons name={"md-beer"} size={30} color={"#ffffff"}/>
    );
  }
}

export default IconYourBars;

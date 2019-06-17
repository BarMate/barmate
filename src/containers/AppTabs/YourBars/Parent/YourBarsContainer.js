import React, { Component } from 'react';
import { View, Text } from 'react-native';
import YourBars from './YourBars';

class YourBarsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <YourBars />
    );
  }
}

export default YourBarsContainer;

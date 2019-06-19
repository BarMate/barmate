import React, { Component } from 'react';
import { View, Text } from 'react-native';
import YourBars from './YourBars';
import Search from './SearchContainer';

class YourBarsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <YourBars mapView={<Search visible={this.state.visible}/>}/>
    );
  }
}

export default YourBarsContainer;

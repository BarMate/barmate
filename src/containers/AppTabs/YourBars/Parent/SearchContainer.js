import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Search from './Search';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Search visible={this.props.visible}/>
    );
  }
}

export default SearchContainer;

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import YourBars from './YourBars';
import Search from './SearchContainer';
import { toggleSearchModal } from '../actions';
import { connect } from 'react-redux';


class YourBarsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.searchModalVisible
    };
  }

  render() {
    return (
      <YourBars toggleSearchModal={this.props.toggleSearchModal} />
    );
  }
}

const mapDispatchToProps = {
  toggleSearchModal,
}

export default connect(null, mapDispatchToProps)(YourBarsContainer);

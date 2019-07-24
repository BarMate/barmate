
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Friends from './Friends';

class FriendsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  _toggleModal = () => {
    if(this.state.modalVisible == false) {
      this.setState({modalVisible: true})
    }
    else {
      this.setState({modalVisible: false})
    }
  }

  render() {
    return (
      <Friends modalVisible={this.state.modalVisible} toggleModal={this._toggleModal} />
    );
  }
}

export default FriendsContainer;

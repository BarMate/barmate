import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback>
        <Image 
          style={styles.root}
          source={this.props.userInfo.photoURL ? {uri: this.props.userInfo.photoURL} : require('../../../assets/logo_final.png')}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
    userInfo: state.AuthReducer.userInfo,
});

export default connect(mapStateToProps, null)(ProfilePicture);

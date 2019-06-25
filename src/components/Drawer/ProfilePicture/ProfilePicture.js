import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { connect } from 'react-redux';
import styles from './styles';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <TouchableWithBounce>
            <Image 
               source={{uri: this.props.userInfo.photoURL}}
               style={styles.profileImage}
            />
        </TouchableWithBounce>
      </View>
    );
  }
}

const mapStateToProps = state => ({
    userInfo: state.AuthReducer.userInfo,
})

export default connect(mapStateToProps, null)(ProfilePicture);

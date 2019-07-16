import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

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
        <TouchableWithBounce onPress={() => this.props.navigation.navigate('Profile')}>
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

export default connect(mapStateToProps, null)(withNavigation(ProfilePicture));

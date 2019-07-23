import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Image 
            style={styles.image}
            source={this.props.userInfo.photoURL ? {uri: this.props.userInfo.photoURL} : require('../../../assets/logo_final.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
    userInfo: state.AuthReducer.userInfo,
});

export default connect(mapStateToProps, null)(withNavigation(ProfilePicture));

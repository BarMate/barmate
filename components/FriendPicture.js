import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { withNavigation, DrawerActions } from 'react-navigation'

class FriendPicture extends Component {

  render() {
    console.log(`RUL: ${this.props.url}`)
    return (
        
        this.props.url === undefined || null ? 
        <Image 
            style={styles.imageProfilePicture}
            source={require('../assets/global/defaultFriendProfilePicture.png')}
        /> :
        <Image 
            style={[styles.imageProfilePicture, {borderColor: 'green', borderWidth: 1}]}
            source={{uri: this.props.url}}
        />  
        
    );
  }
}


const styles = StyleSheet.create({
    imageProfilePicture: {
        width: 65,
        height: 65,
        borderRadius: 32
    }
})

export default FriendPicture

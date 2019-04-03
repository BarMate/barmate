import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { withNavigation, DrawerActions } from 'react-navigation'

class CustomIcon extends Component {
    
  render() {
    return (
        <TouchableOpacity onPress={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}}>
            {
                this.props.picture === '' ? 
                <Image 
                    style={styles.imageProfilePicture}
                    source={require('../assets/login/defaultProfilePicture.png')}
                /> :
                <Image 
                    style={[styles.imageProfilePicture, {borderRadius: 20}]}
                    source={{uri: this.props.picture}}
                />  
            }
        </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
    picture: state.currentProfileReducer.picture,
})

const styles = StyleSheet.create({
    imageProfilePicture: {
        marginLeft: 10,
        width: 40,
        height: 40,
    }
})

export default connect(mapStateToProps, null)(withNavigation(CustomIcon))

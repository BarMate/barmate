import React, { Component } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Variables from '../config/Variables';
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

class FriendsCard extends Component {
  render() {
      console.log(`PROP: ${this.props.name}`)
    return (
        <TouchableOpacity style={styles.container}>
            <Image 
                style={styles.profilePicture}
                source={require('../assets/login/defaultProfilePicture.png')}
            />
            <Text style={styles.name}>{this.props.name}</Text>
            <TouchableOpacity style={styles.messageButton}>
                <Ionicons name={'md-chatboxes'} size={40} color={'#3999c9'}/>
            </TouchableOpacity>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: Variables.deviceWidth - 50,
        height: 60,
        backgroundColor: '#3999c9',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: 'flex-start',
        marginTop: 50,
    },
    name: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 20,
        color: '#ffffff',
        marginLeft: 5,
    },
    messageButton: {
        borderRadius: 10,
        marginRight: 10,
        width: 50,
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    profilePicture: {
        marginLeft: 10,
        width: 50,
        height: 50,
    },
})

export default withNavigation(FriendsCard)
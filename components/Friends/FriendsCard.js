import React, { Component } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Variables from '../../config/Variables';
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

let FRIEND_CARD_WIDTH = Variables.deviceWidth;
let FRIEND_CARD_HEIGHT = 50;

class FriendsCard extends Component {
  render() {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../assets/global/closed.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{this.props.name}</Text>
            </View>
            <View style={styles.messageContainer}>
                <Ionicons name={'ios-text'} size={35} color={'#111E6C'} />
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  rootContainer: {
      width: FRIEND_CARD_WIDTH,
      height: FRIEND_CARD_HEIGHT,
      backgroundColor: 'white',
      marginBottom: 25,
      flexDirection: 'row',
  },
  imageContainer: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 20,
      paddingRight: 15,
  },
  nameContainer: {
      flex: 5,
      justifyContent: 'center',
      paddingLeft: 10,
  },
  messageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  image: {
      width: 65,
      height: 65,
  },
  name: {
      fontSize: 20,
      fontFamily: 'HkGrotesk_Bold',
      color: '#111E6C',
  },
  message: {

  },
})

export default withNavigation(FriendsCard)
import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TouchableWithBounce } from '../../Global/index';
import { Ionicons } from '@expo/vector-icons'

class ButtonLoginGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
    }

  render() {
    return (
        <TouchableWithBounce style={styles.rootContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name={'logo-google'} size={25} color={'#3B5998'} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                  Continue with Google
              </Text>
            </View>
        </TouchableWithBounce>
    );
  }
}

const styles = StyleSheet.create({
    rootContainer: {
        width: 300,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 1 },
        backgroundColor: '#ffffff',
        marginBottom: 25,
    },
    iconContainer: {
      flex: 0.2,
      alignItems: 'center',
      paddingLeft: 10,
    },
    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    buttonText: {
        color: '#302C9E',
        fontSize: 20,
        fontFamily: 'HkGrotesk_Bold',
    }
})
export default ButtonLoginGoogle;

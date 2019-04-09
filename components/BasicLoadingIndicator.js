import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator 
          size="large" 
          color="#fff" 
          animating={this.props.animating}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
})


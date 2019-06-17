import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class BackgroundView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
    }

  render() {
    let { startX, startY, endX, endY } = this.props;
    return (
        <LinearGradient
            style={[this.props.style, styles.gradient]}
            colors={['#42137B', '#302C9E']}
            start={[startX == undefined ? 0 : startX, startY == undefined ? 0 : startY]}
            end={[endX == undefined ? 0 : endX, endY == undefined ? 0.3 : startY]}
        >
            {this.props.children}
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    }
})

export default BackgroundView;

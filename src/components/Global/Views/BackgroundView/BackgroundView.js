import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { LinearGradient } from "expo";

class BackgroundView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
    }

  render() {
    return (
        <LinearGradient
            style={[this.props.style, styles.gradient]}
            colors={['#42137B', '#302C9E']}
            start={[0, 0]}
            end={[0, 0.3]}
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

import React, { Component } from 'react';
import { View, Text, TextInput, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';

class DefaultTextInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return (
        <TextInput
            style={[this.props.style, styles.rootContainer]}
            placeholder={this.props.children}
            placeholderTextColor={'#707070'}
        />
    );
  }
}

const styles = StyleSheet.create({
    rootContainer: {
        width: 300,
        height: 50,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
})
export default DefaultTextInputForm;

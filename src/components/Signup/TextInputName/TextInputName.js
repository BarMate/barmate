import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class TextInputName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.bodyContainer}>                
                <TextInput 
                    style={[styles.nameTextInput, this.props.style]}
                    placeholder={'Name'}
                    placeholderTextColor={'#707070'}
                    value={this.props.loginEmailValue}
                    keyboardAppearance={'dark'}
                />
                <Text style={styles.nameDescriptionText}>Your name everyone will see when using BarMate.</Text>
            </View>
        </View>
    );
  }
}

export default TextInputName;

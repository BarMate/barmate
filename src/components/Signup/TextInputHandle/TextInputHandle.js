import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

class TextInputHandle extends Component {
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
                    placeholder={'Handle'}
                    placeholderTextColor={'#707070'}
                    value={this.props.loginEmailValue}
                    keyboardAppearance={'dark'}
                />
                <Text style={styles.nameDescriptionText}>A way for your friends and Bar goers to connect with you.</Text>
                <Text style={styles.handleText}>@JaneDoe</Text>
                <Text style={styles.isHandleValidText}>Handle is not taken :)</Text>
            </View>
        </View>
    );
  }
}

export default TextInputHandle;

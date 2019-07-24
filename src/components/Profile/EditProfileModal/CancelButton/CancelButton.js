import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class CancelButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={[{ marginRight: 'auto' }, this.props.style]}>
        <Text style={styles.cancelText}> Cancel </Text>
      </View>
    );
  }
}

export default CancelButton;

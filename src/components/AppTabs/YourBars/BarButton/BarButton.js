import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BarTemplate } from '../../../Global/index';
import styles from './styles';

class BarButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  render() {
    return (
        <View style={styles.container}>
            <BarTemplate image={this.props.info.photos[0].photo_reference}>
                <Text style={styles.name}>{this.props.info.name}</Text>
            </BarTemplate>
        </View>
    );
  }
}

export default BarButton;

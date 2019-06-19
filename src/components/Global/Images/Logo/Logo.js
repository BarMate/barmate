import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import styles from './styles';

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
    }

  render() {
    return (
        <View>
            <Image 
                style={[this.props.style, styles.image]}
                source={require('../../../../assets/logo_final.png')}
            />
        </View>
    );
  }
}

export default Logo;

import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

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


const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 90,
        marginBottom: 10,
    }
})

export default Logo;

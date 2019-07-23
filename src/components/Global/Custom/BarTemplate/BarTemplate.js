import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { TouchableWithBounce } from '../../index';
import { LinearGradient } from 'expo-linear-gradient';
import API_KEY from '../../../../config/APIs/Firebase/api_key';

class BarTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const imageApi = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.image}&key=${API_KEY}`
    return (
      <TouchableWithBounce style={[styles.rootContainer, this.props.style]}>
        <LinearGradient
            style={styles.gradient}
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.0)']}
            start={[0,1.3]}
            end={[0,0]}
        >
            { this.props.image !== undefined ? <Image style={styles.backgroundImage} source={{uri: imageApi}} /> : null }
            { this.props.children }
        </LinearGradient>
      </TouchableWithBounce>
    );
  }
}

export default BarTemplate;

import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import { Logo, FadeView } from '../../index';

class ForegroundView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    }

  render() {
    return (
        <View style={[this.props.style, styles.rootContainer]}>
            <View style={styles.upperArea}>
                <Logo />
            </View>
            <FadeView style={styles.lowerArea}>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{this.props.name}</Text>
                </View>
                <View style={styles.bodyContainer}>
                    {this.props.children}
                </View>
            </FadeView>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    upperArea: {
        flex: 0.21,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerArea: {
        flex: 0.79,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        width: Dimensions.get('screen').width - 20,
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'HkGrotesk_Bold',
    },
    textContainer: {
        flex: 0.25,
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
        paddingLeft: 40,
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        width: Dimensions.get('screen').width,
    }
})

export default ForegroundView;

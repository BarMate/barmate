import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Dimensions, KeyboardAvoidingView } from 'react-native';

import { Logo, FadeView } from '../../Global/index';

class ForegroundView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    }

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={[this.props.style, styles.rootContainer]}>
            {/**TODO: Move this code into its own component in the login directory */}
            <SafeAreaView style={styles.upperArea}>
                <Logo />
            </SafeAreaView>
            <FadeView style={styles.lowerArea}>
                <SafeAreaView>
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.headerText}>{this.props.name}</Text>
                        </View>
                    </View>
                    <View style={styles.bodyContainer}>
                        {this.props.children}
                    </View>
                </SafeAreaView>
            </FadeView>
        </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    upperArea: {
        flex: 0.23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerArea: {
        flex: 1,
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
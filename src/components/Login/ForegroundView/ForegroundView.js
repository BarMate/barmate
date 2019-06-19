import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Dimensions, KeyboardAvoidingView } from 'react-native';

import { Logo, FadeView } from '../../Global/index';
import styles from './styles';

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

export default ForegroundView;

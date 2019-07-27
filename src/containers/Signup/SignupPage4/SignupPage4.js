import React, { Component } from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';

import { ButtonBack, ButtonNext, ButtonAllowLocation, IconLocation,  } from "../../../components/Signup/index";
import styles from './styles';
import { withNavigation } from 'react-navigation';

const SignupPage4 = (props) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
        <StatusBar barStyle={'dark-content'} />
        <ButtonBack />
        <Text style={styles.header}>Location</Text>
        <Text style={styles.body}>We only use your location to determine when you enter one of your bars. This will allow you to use our Activities page on our app.</Text>
        <IconLocation />
        <ButtonAllowLocation />
        <ButtonNext onPress={() => props.navigation.navigate('SignupPage5Container')} style={styles.nextButton} />
    </SafeAreaView>
  );
}

export default withNavigation(SignupPage4);
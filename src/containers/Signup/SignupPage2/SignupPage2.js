import React, { Component } from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';

import { ButtonBack, TextInputName, TextInputHandle, ButtonNext } from "../../../components/Signup/index";
import styles from './styles';
import { withNavigation } from 'react-navigation';

const SignupPage2 = (props) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
        <StatusBar barStyle={'dark-content'} />
        <ButtonBack />
        <Text style={styles.header}>Hi</Text>
        <Text style={styles.body}>Thanks for signing up with BarMate! Let's go ahead and finish setting your account up.</Text>
        <TextInputName />
        <TextInputHandle />
        <ButtonNext onPress={() => props.navigation.navigate('SignupPage3Container')} style={styles.nextButton} />
    </SafeAreaView>
  );
}

export default withNavigation(SignupPage2);
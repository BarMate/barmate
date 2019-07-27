import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Text } from 'react-native';
import styles from './styles';

import { BackgroundView } from "../../../components/Global";
import { ForegroundView } from "../../../components/Login";
import { TextInputEmail, TextInputPassword, TextInputConfirmPW, ButtonNext, ButtonClose } from "../../../components/Signup/index";
import { withNavigation } from 'react-navigation';


const SignupPage1 = (props) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
        <StatusBar barStyle={'dark-content'} />
        <ButtonClose />
        <Text style={styles.header}>Sign up</Text>
        <TextInputEmail />
        <TextInputPassword />
        <TextInputConfirmPW />
        <ButtonNext onPress={() => props.navigation.push('SignupPage2Container')} style={styles.nextButton}/>
    </SafeAreaView>
  );
}

export default withNavigation(SignupPage1);
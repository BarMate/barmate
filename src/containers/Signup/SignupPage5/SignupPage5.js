import React, { Component } from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';

import { ButtonBack, ButtonNext, PickerBirthday, PickerGender, PickerInterest } from "../../../components/Signup/index";
import styles from './styles';

const SignupPage5 = (props) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
        <StatusBar barStyle={'dark-content'} />
        <ButtonBack />
        <Text style={styles.header}>Final Details</Text>
        <Text style={styles.body}></Text>
        <PickerBirthday />
        <PickerGender />
        <PickerInterest />
        <ButtonNext style={styles.nextButton} />
    </SafeAreaView>
  );
}

export default SignupPage5;
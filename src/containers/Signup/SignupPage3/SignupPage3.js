import React, { Component } from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';

import { ButtonBack, ButtonNext, ChooseProfilePicture, TextInputBio } from "../../../components/Signup/index";
import styles from './styles';
import { withNavigation } from 'react-navigation';

const SignupPage3 = (props) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
        <StatusBar barStyle={'dark-content'} />
        <ButtonBack />
        <Text style={styles.header}>Profile</Text>
        <Text style={styles.body}>Choose a profile picture and a bio to display on your profile. Your friends and anybody at the same bar as you can see these.</Text>
        <ChooseProfilePicture />
        <TextInputBio />
        <ButtonNext onPress={() => props.navigation.navigate('SignupPage4Container')} style={styles.nextButton} />
    </SafeAreaView>
  );
}

export default withNavigation(SignupPage3);
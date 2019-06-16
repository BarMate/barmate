/**
 *   Stateless component for the Login Screen
 */

import React from "react";
import { View, PropTypes, StatusBar } from "react-native";

import { BackgroundView, DefaultTextInputForm } from '../../components/Global/index';
import { ForegroundView, ButtonLogin, ButtonLoginFB, ButtonLoginGoogle, TroubleLoggingIn, NoAccount } from '../../components/Login/index';
import { AlreadyHaveAccount, ButtonSignup } from '../../components/Signup/index';

const Login = (props) => {
  let { determineRender } = props;
  switch(determineRender) {
    case 'Login': {
      return (
        <BackgroundView>
          <StatusBar barStyle="light-content"/>
          <ForegroundView name="Log In">
            <DefaultTextInputForm>Email</DefaultTextInputForm>
            <DefaultTextInputForm>Password</DefaultTextInputForm>
            <ButtonLogin />
            <ButtonLoginFB />
            <ButtonLoginGoogle />
            <TroubleLoggingIn />
            <NoAccount />
          </ForegroundView>
        </BackgroundView>
      );
    }
    case 'SignupSequence1': {
      return (
        <BackgroundView>
          <StatusBar barStyle="light-content"/>
          <ForegroundView name="Sign up">
            <DefaultTextInputForm>Email</DefaultTextInputForm>
            <DefaultTextInputForm>Password</DefaultTextInputForm>
            <DefaultTextInputForm>Confirm Password</DefaultTextInputForm>
            <ButtonSignup />
            <ButtonLoginFB />
            <ButtonLoginGoogle />
            <AlreadyHaveAccount />
          </ForegroundView>
        </BackgroundView>
      );
    }
    case 'SignupSequence2': {
      return (
        <BackgroundView>
          <StatusBar barStyle="light-content"/>
          <ForegroundView name="Hi">
          </ForegroundView>
        </BackgroundView>
      );
    }
    case 'SignupSequence3': {
      return (
        <BackgroundView>
          <StatusBar barStyle="light-content"/>
          <ForegroundView name="Profile">
          </ForegroundView>
        </BackgroundView>
      );
    }
    case 'SignupSequence4': {
      return(
      <BackgroundView>
        <StatusBar barStyle="light-content"/>
        <ForegroundView name="Location">
        </ForegroundView>
      </BackgroundView>
      );
    }
    case 'SignupSequence5': {
      return(
        <BackgroundView>
          <StatusBar barStyle="light-content"/>
          <ForegroundView name="Final Details">
          </ForegroundView>
        </BackgroundView>
        );
    }
    case 'SignupSequence6': {
      return(
        <BackgroundView>
          <StatusBar barStyle="light-content"/>
          <ForegroundView name="Summary">
          </ForegroundView>
        </BackgroundView>
        );
    }
    default: {
      return (
        <BackgroundView>
          <StatusBar barStyle="light-content"/>
          <ForegroundView name="Default">
            <DefaultTextInputForm>Email</DefaultTextInputForm>
            <DefaultTextInputForm>Password</DefaultTextInputForm>
            <ButtonLogin />
            <ButtonLoginFB />
            <ButtonLoginGoogle />
            <TroubleLoggingIn />
            <NoAccount />
          </ForegroundView>
        </BackgroundView>
      );
    }
  }
};


export default Login;

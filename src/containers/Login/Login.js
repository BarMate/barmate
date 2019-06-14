/**
 *   Stateless component for the Login Screen
 */

import React from "react";
import { View, PropTypes } from "react-native";

import { BackgroundView, ForegroundView, DefaultTextInputForm } from '../../components/Global/index';
import { ButtonLogin, ButtonLoginFB, ButtonLoginGoogle, TroubleLoggingIn, NoAccount } from '../../components/Login/index';

const Login = () => {
  return (
    <BackgroundView>
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
};
  
export default Login;

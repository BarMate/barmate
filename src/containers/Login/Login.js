/**
 *   Stateless component for the Login Screen
 */

import React from "react";
import { View, PropTypes, StatusBar } from "react-native";

import { BackgroundView } from '../../components/Global/index';
import { ForegroundView, ButtonLogin, ButtonLoginFB, ButtonLoginGoogle, TroubleLoggingIn, NoAccount, TextInputEmail, TextInputPassword } from '../../components/Login/index';

const Login = (props) => {
      return (
        <BackgroundView>
          <StatusBar barStyle="light-content"/>
          <ForegroundView name="Log In">
            <TextInputEmail />
            <TextInputPassword />
            <ButtonLogin />
            {/* <ButtonLoginFB />
            <ButtonLoginGoogle /> */}
            {/* <TroubleLoggingIn /> */}
            <NoAccount />
          </ForegroundView>
        </BackgroundView>
      );
  };


export default Login;

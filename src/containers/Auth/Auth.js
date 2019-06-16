/**
 *   Stateless component for the Login Screen
 */

import React from "react";
import {
  ActivityIndicator,
  StatusBar
} from "react-native";

import { BackgroundView, Logo } from '../../components/Global/index';

const Auth = (props) => {
  let { style } = props;
  return (
    <BackgroundView style={style.root}>
        <StatusBar barStyle="light-content"/>
        <Logo style={style.logo} />
        <ActivityIndicator size={0} style={style.indicator} />
    </BackgroundView>
  );
};

export default Auth;

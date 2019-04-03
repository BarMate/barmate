//=============================================================
// Variables.js
//
// Commonly used variables throughout Barmate
// Call using import Variables from 'this-file';
//
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================

import {
  Dimensions,
} from 'react-native';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

var Variables = {
    deviceHeight: height,
    deviceWidth: width,
}

export default Variables;


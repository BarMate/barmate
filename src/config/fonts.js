/* 
    fonts.js
    
    Function that loads fonts into the app
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import { Font } from 'expo';

export function loadFontHkGrotesk() {
    Font.loadAsync({
        HkGrotesk_Bold: require("../assets/fonts/HkGrotesk/HkGrotesk-Bold.ttf"),
        HkGrotesk_BoldItalic: require("../assets/fonts/HkGrotesk/HkGrotesk-BoldItalic.ttf"),
        HkGrotesk_Italic: require("../assets/fonts/HkGrotesk/HkGrotesk-Italic.ttf"),
        HkGrotesk_Light: require("../assets/fonts/HkGrotesk/HkGrotesk-Light.ttf"),
        HkGrotesk_LightItalic: require("../assets/fonts/HkGrotesk/HkGrotesk-LightItalic.ttf"),
        HkGrotesk_Medium: require("../assets/fonts/HkGrotesk/HkGrotesk-Medium.ttf"),
        HkGrotesk_MediumItalic: require("../assets/fonts/HkGrotesk/HkGrotesk-MediumItalic.ttf"),
        HkGrotesk_Regular: require("../assets/fonts/HkGrotesk/HkGrotesk-Regular.ttf"),
        HkGrotesk_SemiBold: require("../assets/fonts/HkGrotesk/HkGrotesk-SemiBold.ttf"),
        HkGrotesk_SemiBoldItalic: require("../assets/fonts/HkGrotesk/HkGrotesk-SemiBoldItalic.ttf"),
    })
}
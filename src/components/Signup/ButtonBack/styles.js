import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
        width: wp('15%'),
        height: wp('10%'),
    },
    iconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    backText: {
        fontSize: wp('5%'),
        fontFamily: 'HkGrotesk_Regular',
        color: '#000000',
    },
    iconSize: wp('7%'),
})

export default styles;
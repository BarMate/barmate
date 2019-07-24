import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: wp('12%'),
        marginBottom: wp('6%'),
    },
    iconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    backText: {
        fontSize: wp('5%'),
        fontFamily: 'HkGrotesk_Regular',
        color: '#ffffff',
    },
    iconSize: wp('7%'),
})

export default styles;
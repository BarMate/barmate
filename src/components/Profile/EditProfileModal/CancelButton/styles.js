import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    root: {
       flex: 1,
    },
    cancelText: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('5%'),
        color: '#000000',
    },
})

export default styles;
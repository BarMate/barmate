import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#302C9E',
        borderRadius: wp('5%'),
        width: wp('17%'),
        height: wp('8%'),
        justifyContent: 'center',
    },
    saveButton: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: wp('5%'),
        color: '#ffffff',
        alignSelf: 'center',
    }
})

export default styles;
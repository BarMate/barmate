import { StyleSheet, Platform } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
  
const styles = StyleSheet.create({
    rootContainer: {
        width: wp('80.5%'),
        height: hp('6.4%'),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: Platform.OS === 'android' ? 0.5 : 0,
        borderColor: '#ebebeb',
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 1 },
        backgroundColor: '#302C9E',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        paddingLeft: 10,
        // fontFamily: 'HkGrotesk_Medium',
    }
})

export default styles;
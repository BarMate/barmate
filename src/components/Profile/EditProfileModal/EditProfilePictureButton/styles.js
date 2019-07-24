import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
    },
    profilePictureImage: {
        width: wp('50%'),
        height: wp('50%'),
        borderRadius: wp('25%'),
        borderWidth: 0.3,
        borderColor: 'rgba(0,0,0,0.5)'
    },
    editPictureText: {
        fontFamily: 'HkGrotesk_Light',
        fontSize: wp('3%'),
        color: 'rgba(0,0,0,0.3)',
        margin: wp('2%'),
    },
})

export default styles;
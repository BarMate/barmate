import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
    },
    nameTextInput: {
        width: wp('90%'),
        height: hp('7%'),
        borderRadius: wp('10%'),
        backgroundColor: '#ffffff',
        borderWidth: wp('0.3%'),
        borderColor: 'rgba(0,0,0,0.3)',
        paddingLeft: wp('4%'),
        fontSize: wp('4%'),
    },
})

export default styles;
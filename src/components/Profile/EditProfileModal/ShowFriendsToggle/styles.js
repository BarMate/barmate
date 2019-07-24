import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
       flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'flex-start',
       paddingLeft: wp('6%'),
       paddingRight: wp('6%'),
    },
    text: {
        fontSize: wp('5%'),
        fontFamily: 'HkGrotesk_Medium',
        color: 'rgba(0,0,0,0.9)',
    },
    switch: {
        marginLeft: 'auto',
    }
})

export default styles;
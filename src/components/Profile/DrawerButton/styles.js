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
        width: wp('12%'),
        height: wp('12%'),
        backgroundColor: '#ffffff',
        borderRadius: wp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSize: wp('9%'),

})

export default styles;
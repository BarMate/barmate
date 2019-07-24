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
        width: wp('10%'),
        height: wp('10%'),
        backgroundColor: '#ffffff',
        borderRadius: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSize: wp('7%'),

})

export default styles;
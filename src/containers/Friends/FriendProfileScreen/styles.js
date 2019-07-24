import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    root: {
       flex: 1,
       alignItems: 'center',
    },
    headerText: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: wp('10%'),
        color: '#ffffff',
        marginBottom: wp('6%'),
    },
    scrollViewContainer: {
        flex: 1,
        width: wp('90%'),
    },
    scrollViewContent: {
        flexGrow: 1,
    }
})

export default styles;
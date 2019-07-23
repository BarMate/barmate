import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    rootContainer: {
       height: hp('50%'),
       paddingLeft: wp('7%'),
       marginTop: hp('1%'),
       justifyContent: 'center',
    },
    contentView: {
        width: wp('86%'),
        height: wp('86%'),
        backgroundColor: '#ffffff',
        marginTop: wp('5%'),
        borderRadius: wp('5%'),
    },
    headerText: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: wp('7%'),
        color: '#ffffff',
    }
})

export default styles;
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    rootContainer: {
       width: wp('86%'),
       height: hp('10%'),
       justifyContent: 'center',
       marginLeft: wp('3%'),
       marginTop: wp('3%'),
    },
    barName: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: wp('5%'),
        color: '#000000'
    },
    newsType: {
        fontFamily: 'HkGrotesk_SemiBold',
        fontSize: wp('5%'),
        color: '#302C9E',
    },
    newsBody: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('3%'),
        color: 'rgba(0,0,0,0.5)',
        flexShrink: 1,
    }
})

export default styles;
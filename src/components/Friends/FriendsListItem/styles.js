import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    root: {
       flex: 1,
       maxHeight: hp('9%'),
       flexDirection: 'row',
       alignItems: 'center',
       borderBottomColor: 'rgba(0,0,0,0.1)',
       borderBottomWidth: wp('0.1%'),
    },
    image: {
        width: wp('14%'),
        height: wp('14%'),
        borderRadius: wp('7%'),
        margin: wp('4%')
    },
    name: {
        fontFamily: 'HkGrotesk_SemiBold',
        fontSize: wp('6.5%'),
        color: '#000000',
    },
})

export default styles;
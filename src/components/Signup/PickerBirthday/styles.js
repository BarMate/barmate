import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    rootContainer: {
        width: wp('84%'),
        height: hp('7%'),
        justifyContent: 'center',
        borderWidth: wp('0.1%'),
        borderRadius: wp('15%'),
        marginBottom: hp('1%'),
    },
    buttonText: {
        fontSize: wp('4%'),
        color: 'rgba(0,0,0,0.3)',
        paddingLeft: wp('4%'),
    },
    bodyText: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: wp('4%'),
        color: 'rgba(0,0,0,0.8)',
        paddingLeft: wp('4%'),
        marginBottom: hp('2%'),
    }
})

export default styles;
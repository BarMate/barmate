import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   rootContainer: {
        flex: 1,
        margin: wp('8%'),
   },
   header: {
       fontFamily: 'HkGrotesk_Bold',
       fontSize: wp('10%'),
       color: '#000000',
       marginTop: hp('4%'),
       marginBottom: hp('1%'),
   },
   body: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('4%'),
        color: '#000000',
        marginBottom: hp('5%'),
   },
   nextButton: {
        marginTop: hp('27%'),
    },
})

export default styles;
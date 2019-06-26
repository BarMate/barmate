import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   rootContainer: {
        width: wp('45%'),
        height: hp('25%'),
        backgroundColor: '#302C9E',
        borderRadius: wp('8%'),
   },
   gradient: {
        flex: 1,
        borderRadius: wp('8%'),
        justifyContent: 'flex-end',
   },
   backgroundImage: {
        borderRadius: wp('8%'),
        position: 'absolute',
        width: wp('45%'),
        height: hp('25%'),
   },
})

export default styles;
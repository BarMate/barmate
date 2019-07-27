import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   root: {
    width: wp('83%'),
    height: hp('10%'),
    borderRadius: wp('5%'),
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: wp('0.1%'),
    marginTop: hp('5%'),
    padding: wp('5%'),
   }
})

export default styles;
import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   rootContainer: {
      height: hp('25%'),
   },
   flatlist: {
      alignSelf: 'center',
      paddingLeft: wp('7%'),
      paddingRight: wp('7%'),
   }
})

export default styles;
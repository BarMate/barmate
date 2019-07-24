import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   iconContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft: wp('6%'),
      marginBottom: wp('7%'),
   },
   buttonSettings: {
      margin: wp('2%'),
   },
   buttonQRCode: {
      margin: wp('2%'),
   },
   iconSize: wp('9%'),
})

export default styles;
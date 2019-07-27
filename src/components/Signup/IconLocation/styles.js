import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   root: {
    width: wp('85%'),
    height: hp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
   },
   bodyText: {
      fontSize: wp('4%'),
      fontFamily: 'HkGrotesk_Medium',
      color: '#000000',
      marginBottom: hp('2%'),
      textAlign: 'center',
   },
   iconSize: wp('32%'),
})

export default styles;
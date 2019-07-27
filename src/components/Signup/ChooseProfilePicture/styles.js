import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   root: {
     width: wp('50%'),
     height: wp('50%'),
     alignSelf: 'center',
     justifyContent: 'center',
     alignItems: 'center',
   },
   textChoosePicture: {
     fontFamily: 'HkGrotesk_Light',
     fontSize: wp('3%'),
     color: '#000000',
   },
   iconSize: wp('50%'),
})

export default styles;
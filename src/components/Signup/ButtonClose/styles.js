import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   rootContainer: {
    width: wp('10%'),
    height: wp('10%'),
   },
   iconSize: wp('10%'),
})

export default styles;
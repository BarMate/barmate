import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    rootContainer: {
        flex: 0.6,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
   profileImage: {
        backgroundColor: 'black',
        width: wp('35%'),
        height: wp('35%'),
        borderRadius: wp('17.5%'),
   }
})

export default styles;
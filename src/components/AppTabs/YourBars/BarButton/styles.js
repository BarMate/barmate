import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    name: {
        fontSize: wp('7%'),
        fontFamily: 'HkGrotesk_SemiBold',
        color: 'white',
        margin: wp('4%'),
    },
    container: {
        marginRight: wp('2%'),
        zIndex: 1,
    },
    bar: {
        width: wp('42%'),
    },
})

export default styles;
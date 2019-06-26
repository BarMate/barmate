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
        marginLeft: wp('1.25%'),
        marginRight: wp('1.25%')
    },
})

export default styles;
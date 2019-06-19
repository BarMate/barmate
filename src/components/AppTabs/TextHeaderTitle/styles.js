import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    header: {
        fontSize: wp('10%'),
        fontWeight: 'bold',
        fontFamily: 'HkGrotesk_Bold',
        color: 'white',
    },
})

export default styles;
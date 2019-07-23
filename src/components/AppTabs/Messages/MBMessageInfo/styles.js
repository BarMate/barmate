import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
       flex: 1,
       justifyContent: 'center',
    },
    name: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: wp('4%'),
        color: '#302C9E',
    },
    messagePreview: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: wp('3%'),
        color: 'rgba(0,0,0,0.5)',
    },
})

export default styles;
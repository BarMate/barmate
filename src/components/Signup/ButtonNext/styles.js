import { StyleSheet, Platform } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
        width: wp('80.5%'),
        height: hp('6.4%'),
        borderRadius: wp('40.25%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: Platform.OS === 'android' ? 0.5 : 0,
        backgroundColor: '#302C9E',
        marginTop: 30,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: wp('6%'),
        paddingLeft: 10,
        fontFamily: 'HkGrotesk_Bold',
    }
})

export default styles;
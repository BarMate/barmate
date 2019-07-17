import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';
 
const styles = StyleSheet.create({
    rootContainer: {
        width: wp('90%'),
        height: hp('40%'),
        alignItems: 'center',
        marginTop: wp('5%'),
        borderBottomWidth: 0.3,
        borderBottomColor: 'rgba(0,0,0,0.2)'
    },
    favoriteBarContainer: {
        margin: wp('10%'),
    },
    headerText: {
        fontSize: wp('6%'),
        fontFamily: 'HkGrotesk_SemiBold',
        color: '#000000',
    }
})

export default styles;
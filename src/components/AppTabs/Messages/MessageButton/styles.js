import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    rootContainer: {
       width: wp('90%'),
       height: hp('10%'),
       backgroundColor: '#ffffff',
       borderRadius: wp('3%'),
       flexDirection: 'row',
       marginBottom: wp('4%'),
    },
    imageContainer: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 0.70,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    arrowContainer: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSize: wp('9%'),
})

export default styles;
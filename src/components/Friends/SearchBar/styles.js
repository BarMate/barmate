import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        maxHeight: hp('9%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarContainer: {
        borderRadius: wp('6%'),
        margin: wp('3%'),
        width: wp('85%'),
        height: hp('5%'),
        borderWidth: 0.3,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textInput: {
        flex: 0.8,
        paddingLeft: wp('5%'),
    },
    iconContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSize: wp('5%')
})

export default styles;
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
  
const styles = StyleSheet.create({
    rootContainer: {
        width: wp('80.5%'),
        height: hp('22%'),
        backgroundColor: 'blue',
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },  
    nameTextInput: {
        width: wp('80.5%'),
        height: hp('6.4%'),
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: wp('40.25%'),
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    nameDescriptionText: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('4%'),
        color: '#000000',
        marginLeft: wp('5%'),
    },
    handleText: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('4%'),
        color: '#000000',
        marginLeft: wp('5%'),
        marginTop: wp('2%'),
        marginRight: wp('5%')
    },
    isHandleValidText: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('4%'),
        color: 'green', // Dynamic based on if handle is taken
        marginLeft: wp('5%'),
        marginTop: wp('2%'),
        marginRight: wp('5%')
    },
})

export default styles;

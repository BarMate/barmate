import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
  
const styles = StyleSheet.create({
    rootContainer: {
        width: wp('84%'),
        height: hp('15%'),
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },  
    nameTextInput: {
        width: wp('84%'),
        height: hp('6.4%'),
        backgroundColor: '#ffffff',
        borderWidth: wp('0.1%'),
        borderColor: '#707070',
        borderRadius: wp('40.25%'),
        paddingHorizontal: wp('5%'),
        marginBottom: hp('1%'),
    },
    nameDescriptionText: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('4%'),
        color: '#000000',
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
    },
})

export default styles;

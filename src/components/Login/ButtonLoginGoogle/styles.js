import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
  

const styles = StyleSheet.create({
    rootContainer: {
        width: wp('80.5%'),
        height: hp('6.4%'),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 1 },
        backgroundColor: '#ffffff',
        marginBottom: 25,
    },
    iconContainer: {
      flex: 0.2,
      alignItems: 'center',
      paddingLeft: 10,
    },
    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    buttonText: {
        color: '#302C9E',
        fontSize: wp('5%'),
        fontFamily: 'HkGrotesk_Bold',
    }
})

export default styles;
import { StyleSheet, Platform,  } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
  
const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonAllowLocation: {
      width: wp('60%'),
      height: hp('5%'),
      backgroundColor: 'white',
      shadowOpacity: 0.6,
      shadowOffset: { width: 0, height: 1 },
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: wp('25%'),
      borderWidth: Platform.OS === "android" ? 0.5 : 0,
      borderColor: '#ebebeb',
    },
    textAllowLocation: {
      fontSize: wp('4%'),
      fontFamily: 'HkGrotesk_Medium',
      color: '#302C9E'
    }
  })

  export default styles;
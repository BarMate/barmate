import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
   rootContainer: {
      flex: 0.12,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: 'rgba(255,255,255,0.3)',
    },
    iconContainer: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 0.6,
      alignItems: 'center'
    },
    text: {
      fontSize: wp('5%'),
      color: '#FFFFFF',
      fontFamily: 'HkGrotesk_SemiBold',
    },
    iconSize: wp('9%'),
});

export default styles;

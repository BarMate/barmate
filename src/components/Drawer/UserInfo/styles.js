import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'HkGrotesk_Bold',
    fontSize: wp('6%'),
    color: '#000000',
  },
  handle: {
    fontFamily: 'HkGrotesk_Medium',
    fontSize: wp('3%'),
    color: '#000000',
  },
});

export default styles;

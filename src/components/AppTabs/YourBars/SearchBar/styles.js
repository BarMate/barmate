import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  searchSection: {
    position: 'absolute',
    width: wp('80%'),
    height: hp('5%'),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    backgroundColor: "#fff",
    marginTop: 15,
    borderRadius: 20,
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 1 },
  },
  searchIcon: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    color: "#302C9E",
    fontFamily: 'HkGrotesk_Medium',
    fontSize: wp('5%'),
    paddingRight: 20,
    textAlign: 'center',
  }
});

export default styles;

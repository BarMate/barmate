import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
       width: wp('16%'),
       height: wp('16%'),
       borderRadius: wp('8%'),
    },
})

export default styles;
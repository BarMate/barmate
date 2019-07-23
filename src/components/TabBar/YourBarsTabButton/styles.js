import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
 
const styles = StyleSheet.create({
    homeTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
    },
    iconSize: wp('7%'),
})

export default styles;
import { StyleSheet } from 'react-native' 
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    image: {
        width: wp('22%'),
        height: wp('24%'),
        marginBottom: 10,
    }
})

export default styles;
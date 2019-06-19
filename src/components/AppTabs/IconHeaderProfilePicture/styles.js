import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    root: {
        width: wp('13.5%'),
        height: wp('13.5%'),
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 25,
        marginLeft: 20,
    }
})

export default styles;
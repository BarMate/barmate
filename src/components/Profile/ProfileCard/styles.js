import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
  
const styles = StyleSheet.create({
    rootContainer: {
       flex: 1,
       backgroundColor: '#ffffff',
       borderRadius: wp('4%'),
    },
    test: {
        fontSize: 50,
    }
})

export default styles;
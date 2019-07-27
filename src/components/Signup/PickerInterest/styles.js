import { StyleSheet } from 'react-native'
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
   root: {
    
   }
})

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: wp('4%'),
        width: wp('84%'),
        height: hp('7%'),
        paddingHorizontal: wp('4%'),
        borderWidth: wp('0.1%'),
        borderRadius: wp('15%'),
        color: '#000000',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
})

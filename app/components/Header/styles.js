import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { Constants } from 'expo';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      height: height*.12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#BE1E2D',
    },
    statusBar: {
      backgroundColor: "#C2185B",
      height: Constants.statusBarHeight,
    }, 
    title: {
      fontSize: 22,
      color: '#FFFFFF',
    },
    sandwichMenu: {
      width: 35,
      height: 5,
      backgroundColor: 'black',
      margin: 1,
    },
});
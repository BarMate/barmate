import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { Constants } from 'expo';

var {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
    container: {
      height: height*.12,
      justifyContent: 'center',
      backgroundColor: '#BE1E2D',
    },
    statusBar: {
      backgroundColor: "#C2185B",
      height: Constants.statusBarHeight,
    }, 
    title: {
      paddingBottom: 30,
      textAlign: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center',
      fontSize: 22,
      color: '#FFFFFF',
    },
    sandwichMenu: {
      width: width*.05,
      height: height*.004,
      backgroundColor: 'white',
      margin: 1.6,
    },
});
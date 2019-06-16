import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    rootContainer: {
        width: 300,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 60,
        marginBottom: 10 ,
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 1 },
        backgroundColor: '#ffffff',
    },
    iconContainer: {
      flex: 0.2,
      alignItems: 'center',
      paddingLeft: 10,
    },
    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    buttonText: {
        color: '#302C9E',
        fontSize: 20,
        fontFamily: 'HkGrotesk_Bold',
    }
})

export default styles;
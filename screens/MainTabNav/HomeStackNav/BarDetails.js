import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Variables from "../../../config/Variables.js";
import COLORS from '../../../config/Colors.js';
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux';

class BarDetails extends Component { 

  render() {
    return (
    <SafeAreaView>
        <View style={styles.container}>
        <ScrollView style={styles.scrollview}>
            <ImageBackground
                style={styles.image}
                source={require('../../../assets/global/gradient.png')}
            >
                <TouchableOpacity style={styles.close} onPress={() => {this.props.navigation.navigate('Home')}}>
                    <Image style={{width: 40, height: 40}} source={require('../../../assets/global/open.png')}/>
                </TouchableOpacity>

                <Text style={styles.title}>{this.props.selectedBarData.name}</Text>
            </ImageBackground>
            <Text style={styles.hours}>5:00PM - 3:00AM</Text>
            <Text style={styles.subtitle}>No events today</Text>
            <Text style={styles.subtitle}>Friends inside bar</Text>
            <Text style={styles.subtitle}>Friends planning on going</Text>
            <TouchableOpacity style={styles.join}>
                <Text style={{fontSize: 20, color: 'white'}}>Join</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
    </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
    selectedBarData: state.homeReducer.selectedBarData
})

const styles = StyleSheet.create({
    container: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight,
    },
    scrollview: {
        width: Variables.deviceWidth,
        backgroundColor: 'white',
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        width: Variables.deviceWidth,
        height: 400,
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: 10,
        marginRight: 10,
    },
    title: {
        paddingLeft: 15,
        paddingBottom: 15,
        fontSize: 25,
        color: 'white',
        alignSelf: 'flex-start'
    },
    subtitle: {
        fontSize: 15,
        paddingLeft: 15,
        marginTop: 100,
        color: 'black',
    },
    hours: {
        paddingLeft: 15,
        paddingTop: 10,
        fontSize: 23,
        color: 'black'
    },
    join: {
        marginTop: 100,
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.GRADIENT_COLOR_1,
        borderRadius: 25,
        width: 150,
        height: 50,
    }
});
export default connect(mapStateToProps, null)(withNavigation(BarDetails));

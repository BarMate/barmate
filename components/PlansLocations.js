import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Variables from "../config/Variables.js";

class PlansLocations extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locationsAttending: [],
            userBars: this.props.bars
        };
        this.renderNumber = this.renderNumber.bind(this);
    }

    updateBarsAttending(barID){
        console.log('updating');
        attendingList = this.state.locationsAttending;
        wasRemoved = false;
        for(var x = 0; x < attendingList.length; x++){
            if(barID === attendingList[x]){
                attendingList.splice(x,1);
                wasRemoved = true;
            }
        }

        if(!wasRemoved){
            attendingList.push(barID);
        }
        this.props.handler(attendingList);
        this.setState({locationsAttending: attendingList});
    }

    renderNumber = (barID) => {
        attendingList = this.state.locationsAttending;
        for(var x = 0; x < attendingList.length; x++){
            if(barID === attendingList[x]){
                return(<View style={[styles.circle, {backgroundColor: 'green'}]}><Text style={styles.number}>{x+1}</Text></View>);
            }
        }
        return(<Text></Text>);
    }
    
    render() {
        return (
            <FlatList
                style={styles.flatList}
                data={this.state.userBars}
                extraData={this.state}
                renderItem={({ item }) => (
                    <View style={styles.flatListElement}>
                        <TouchableOpacity onPress={() => this.updateBarsAttending(item.key)}>
                            <View style={styles.circle}>
                                {this.renderNumber(item.key)}
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.flatListElementText}>{item.name}</Text>
                    </View>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    flatList: {
        paddingTop: 20, 
        height: Variables.deviceHeight * 0.45,
    },
    flatListElement: {
        width: Variables.deviceWidth - 50,
        height: 100,
        padding: 5,
        alignItems: "center",
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        flexDirection: "row",
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 20,
	},
	flatListElementText: {
        paddingLeft: 10,
        backgroundColor: "#ffffff",
        height: 50,
        fontFamily: 'HkGrotesk_Italic',
        fontSize: 20,
    },
    circle: {
        height: 75,
        width: 75, 
        borderRadius: 75/2.0,
        backgroundColor: "#c0c0c0",
        justifyContent: 'center',
        alignItems: 'center',
    },
    number:{
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 30,
        color: '#ffffff',
    }
});

export default (PlansLocations);
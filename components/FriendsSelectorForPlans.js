import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Variables from "../config/Variables.js";
import { SearchBar } from 'react-native-elements';

class FriendsSelectorForPlans extends Component {
    constructor(props){
        super(props);
        this.state = {
            friendsInvited: [],
            data: this.props.friends
        };
		this.arrayHolder = this.props.friends;
    }

    renderHeader = () => {    
		return (      
			<SearchBar
                inputContainerStyle={{ backgroundColor: 'rgba(222,32,167,1.0)'}}
                containerStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
				placeholder="Search Friends..."
				round
				onChangeText={text => this.searchFilterFunction(text)}
				autoCorrect={false}
			/>    
		);  
    };
    
    searchFilterFunction = text => {
		console.log(this.arrayHolder);
		const newData = this.arrayHolder.filter(item => {
			const itemData = `${item.name.toUpperCase()} ${item.handle.toUpperCase()}`;
			const textData = text.toUpperCase();
			return itemData.indexOf(textData) > -1;
		});
		this.setState({
		    data: newData,
		});
    };

    updateUsersInvited(userID){
        invitedList = this.state.friendsInvited;
        wasRemoved = false;
        for(var x = 0; x < invitedList.length; x++){
            if(userID === invitedList[x]){
                invitedList.splice(x,1);
                wasRemoved = true;
            }
        }

        if(!wasRemoved){
            invitedList.push(userID);
        }
        this.setState({friendsInvited: invitedList})
        this.props.handler(invitedList)
    }

    renderOverlay(userID){
        invitedList = this.state.friendsInvited;
        for(var x = 0; x < invitedList.length; x++){
            if(userID === invitedList[x]){
                return(<View style={[styles.circle, {backgroundColor: 'green'}]}/>);
            }
        }
        return(<Text></Text>);
    }
    
    render() {
        return (
            <FlatList
                style={{height: Variables.deviceHeight * 0.8}}
                data={this.state.data}
                extraData={this.state}
                keyExtractor={item => item.handle}
                ListHeaderComponent={this.renderHeader}
                renderItem={({ item }) => (
                    <View style={styles.userCard}>
                        <TouchableOpacity onPress={() => this.updateUsersInvited(item.key)}>
                            <View style={styles.circle}>{this.renderOverlay(item.key)}</View>
                        </TouchableOpacity>
                        <Text style={styles.flatListElementText}>{item.name}</Text>
                        <Text style={styles.flatListElementText}>{'@'+item.handle}</Text>
                    </View>
                )}
            />
        )
    }
}

styles = StyleSheet.create({
    userCard: {
        width: Variables.deviceWidth - 25,
        height: 50,
        padding: 5,
        alignItems: "center",
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        flexDirection: "row",
        borderRadius: 15,
        marginTop: 10,
	},
	flatListElementText: {
        paddingLeft: 10,
        backgroundColor: "#ffffff",
        height: 50,
        fontFamily: 'HkGrotesk_Italic',
        fontSize: 20,
    },
    circle: {
        height: 25,
        width: 25, 
        borderRadius: 25/2.0,
        backgroundColor: "#c0c0c0",
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default (FriendsSelectorForPlans);
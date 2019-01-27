import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Variables from "../config/Variables.js";
import { SearchBar } from 'react-native-elements';
import AsyncImage from './AsyncImage.js';
import { withNavigation } from 'react-navigation';
class FriendsSelectorForPlans extends Component {
    constructor(props){
        super(props);
        this.state = {
            friendsInvited: [],
            data: this.props.friends,
            invitedCount: 0,
            seeInvited: false
        };
		this.arrayHolder = this.props.friends;
    }
    
    renderInvitedText(){
        if(!this.state.seeInvited){
            return(<View style={styles.invitedContainer}><Text style={styles.invitedText}># Invited: {this.state.invitedCount}</Text></View>)
        }
        return (<View style={styles.invitedContainer}><Text style={styles.invitedText}>See All</Text></View>)
    }

    renderInvited = ({item}) => {
        console.log(item);
        if (this.state.friendsInvited.indexOf(item.key) > -1){
            return (
                <View style={styles.userCard}>
                    <TouchableOpacity onPress={() => console.log('tap')}>
                        <AsyncImage 
                            uid={item.key}
                            style={styles.profilePictureView}
                        />
                    </TouchableOpacity>
                    <View style={styles.nameAndHandleContainer}>
                        <Text style={styles.username}>{item.name}</Text>
                        <Text style={styles.handle}>{'@'+item.handle}</Text>
                    </View>
                    <TouchableOpacity style={styles.circleContainer} onPress={() => this.updateUsersInvited(item.key)}>
                        <View style={styles.circle}>{this.renderOverlay(item.key)}</View>
                    </TouchableOpacity>
                </View>
                
            )
        }    
    }

    handleInvitedButton(){
        console.log(this.state.seeInvited)
        this.setState({
            seeInvited: !this.state.seeInvited
        })
    }

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
                this.setState({
                    friendsInvited: invitedList,
                    invitedCount: this.state.invitedCount - 1
                })
            }
        }

        if(!wasRemoved){
            invitedList.push(userID);
            this.setState({
                friendsInvited: invitedList,
                invitedCount: this.state.invitedCount + 1
            })
        }
        this.props.handler(invitedList)
    }

    renderOverlay(userID){
        invitedList = this.state.friendsInvited;
        for(var x = 0; x < invitedList.length; x++){
            if(userID === invitedList[x]){
                return <View style={[styles.circle, {backgroundColor: 'green'}]}/>
            }
        }
        return <View/>
    }
    
    render() {
        return (
            <View>
                <SearchBar
                    inputStyle={{ backgroundColor: 'rgba(0,0,0,0.5)'}}
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    placeholder="Search Friends..."
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                />
                <TouchableOpacity onPress={() => {this.handleInvitedButton()}}>
                    {this.renderInvitedText()}
                </TouchableOpacity>
                    { !this.state.seeInvited ? 
                        <FlatList
                            style={{height: Variables.deviceHeight * 0.60}}
                            data={this.state.data}
                            extraData={this.state}
                            keyExtractor={item => item.handle}
                            renderItem={({ item }) => (
                                <View style={styles.userCard}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectedProfile', {uid: item.key})}>
                                        <AsyncImage 
                                            uid={item.key}
                                            style={styles.profilePictureView}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.nameAndHandleContainer}>
                                        <Text style={styles.username}>{item.name}</Text>
                                        <Text style={styles.handle}>{'@'+item.handle}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.circleContainer} onPress={() => this.updateUsersInvited(item.key)}>
                                        <View style={styles.circle}>{this.renderOverlay(item.key)}</View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        /> 
                            :
                        <FlatList
                            style={{height: Variables.deviceHeight * 0.60}}
                            data={this.state.data }
                            extraData={this.state}
                            keyExtractor={item => item.handle}
                            renderItem={this.renderInvited}
                        />
                    }
            </View>
        )
    }
}

styles = StyleSheet.create({
    invitedContainer: {
        width: Variables.deviceWidth,
        alignItems: "center",
        alignSelf: 'center',
        backgroundColor: '#3999c9'
    },
    invitedText: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 20,
        color: '#ffffff',
        padding: 10
    },
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
    nameAndHandleContainer: {
        marginLeft: 5,
        justifyContent: 'center',
        flexDirection:'column',
    },
	username: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 20,
    },
    handle: {
        fontFamily: 'HkGrotesk_Italic',
        fontSize: 16,
    },
    profilePictureView: {
        height: 30,
        width: 30, 
        borderRadius: 30/2.0,
        backgroundColor: "#c0c0c0",
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleContainer: {
        position: 'absolute',
        right: 10
    },
    circle: {
        height: 25,
        width: 25, 
        borderRadius: 25/2.0,
        backgroundColor: "#c0c0c0",
    }
});

export default (withNavigation(FriendsSelectorForPlans));
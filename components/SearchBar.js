/* 
    SearchBar.js
    
    Search Text Input component for Map screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { onChangeInputFieldDebounced, onSubmitNearbySearch, userSearch } from '../redux/actions/SearchActions'
import Variables from '../config/Variables';
import Ionicons from '@expo/vector-icons/Ionicons';

class SearchBar extends Component {
  render() {
    return (
        <View style={styles.textInputContainer}>
            <Ionicons name={'ios-search'} size={20} color={'#FFFFFF'} style={styles.searchIcon}/>
            <TextInput  
                onFocus={() => {this.props.userSearch(false)}}
                ref={input => {this.textInput = input}}
                style={styles.destinationInput}
                placeholder="Enter Bar or Club.." 
                placeholderTextColor="#e8e8e8"
                value={this.props.destination} 
                onChangeText={destination => this.props.onChangeInputFieldDebounced(destination)}
                keyboardAppearance={'dark'}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                onSubmitEditing={text => this.props.onSubmitNearbySearch(text.nativeEvent.text)}
            />
            {
                this.props.destination === '' ? null : 
                <TouchableOpacity style={styles.clearText} onPress={() => this.props.onChangeInputFieldDebounced('')}>
                    <Ionicons name={'ios-close-circle'} size={20} color={'#FFFFFF'} />
                </TouchableOpacity>
            }
        </View>

    )
  }
}

const mapStateToProps = state => ({
    destination: state.searchReducer.destination,
})

const mapDispatchToProps = {
    onChangeInputFieldDebounced,
    onSubmitNearbySearch,
    userSearch,
}

const styles = StyleSheet.create({
    destinationInput: {
        height: 40,
        width: Variables.deviceWidth - 55,
        backgroundColor: '#302C9E',
        borderRadius: 5,
        fontFamily: 'HkGrotesk_Medium',
        color: 'white',
        padding: 5,
        marginLeft: 5
    },
    textInputContainer: {
        flex: 1,
        backgroundColor: '#302C9E',
        flexDirection: 'row',
    },
    clearText: {
        alignSelf: 'center',
        paddingRight: 20,
    },
    searchIcon: {
        alignSelf: 'center',
        paddingLeft: 10,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
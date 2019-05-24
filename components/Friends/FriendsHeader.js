import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { withNavigation } from 'react-navigation'

class FriendsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <TouchableOpacity style={styles.menu} onPress={() => {this.props.navigation.openDrawer()}}>
            <Ionicons name={'ios-menu'} size={40} color={'#ffffff'}/>
        </TouchableOpacity>
    
        <Text style={styles.title}>Friends</Text>
        
        <Ionicons style={styles.search} name={'ios-search'} size={25} color={'#ffffff'}/>
        <Ionicons style={styles.add} name={'ios-add'} size={40} color={'#ffffff'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'HkGrotesk_Bold',
        color: 'white',
        fontSize: 30,
        paddingLeft: 10,
    },
    menu: {
        paddingLeft: 15
    },
    search: {
        marginLeft: 'auto',
        paddingLeft: 60,
    },
    add: {
        marginLeft: 'auto',
        paddingRight: 20,
    },
})

export default withNavigation(FriendsHeader)
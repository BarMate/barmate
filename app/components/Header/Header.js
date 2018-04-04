import React from 'react';

import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Icon, Button, Content, Left} from 'native-base'

import styles from './styles';

// Custom Header
const Header = ({title}) => (
        <View style={styles.container}>
            {/* <View style={styles.statusBar}/> */}
            <StatusBar translucent={false} barStyle="light-content" />
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{flexDirection: 'column'}}>
                <View style={styles.sandwichMenu}/>
                <View style={styles.sandwichMenu}/>
                <View style={styles.sandwichMenu}/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            </View>
        </View>
);


export default Header;
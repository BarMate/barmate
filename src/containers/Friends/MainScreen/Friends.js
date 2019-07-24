import React from 'react';
import { View, SafeAreaView, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

import { BackgroundView } from '../../../components/Global/index';
import { DrawerButton } from '../../../components/Profile/index';
import { FriendsCard, AddFriendModal } from '../../../components/Friends/index';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

const Friends = (props) => {
    return(
        <BackgroundView style={styles.root}>
            <View style={styles.scrollViewContainer}>
                <AddFriendModal modalVisible={props.modalVisible} />
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false} />}>
                    <DrawerButton />   
                    <View style={styles.headerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.headerText}>Friends</Text>
                        </View>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => props.toggleModal()}>
                            <Ionicons name={'ios-add'} size={styles.iconSize} color={'#ffffff'} />
                        </TouchableOpacity>
                    </View>
                    <FriendsCard />
                </ScrollView>
            </View>
        </BackgroundView>
    );
}

export default Friends;
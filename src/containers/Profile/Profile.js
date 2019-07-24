import React from 'react';
import { View, SafeAreaView, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { BackgroundView } from '../../components/Global/index';
import { DrawerButton, ProfileCard, EditProfileRootView } from '../../components/Profile/index';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

const Profile = (props) => {
    return(
        <BackgroundView style={styles.root}>
            <View style={styles.scrollViewContainer}>
                <EditProfileRootView modalVisible={props.modalVisible} />
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false} />}>
                    <DrawerButton />   
                    <View style={styles.headerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.headerText}>Profile</Text>
                        </View>
                        <TouchableOpacity style={styles.editContainer} onPress={() => props.toggleModal()}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <ProfileCard />
                </ScrollView>
            </View>
        </BackgroundView>
    );
}

export default Profile;
import React from 'react';
import { View, SafeAreaView, Text, ScrollView, RefreshControl } from 'react-native';
import { BackgroundView } from '../../components/Global/index';
import { DrawerButton, ProfileCard } from '../../components/Profile/index';

import styles from './styles';

const Profile = (props) => {
    return(
        <BackgroundView style={styles.root}>
            <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false} />}>
                    <DrawerButton />   
                    <Text style={styles.headerText}>Profile</Text>
                    <ProfileCard />
                </ScrollView>
            </View>
        </BackgroundView>
    );
}

export default Profile;
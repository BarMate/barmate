import React from 'react';
import { View, SafeAreaView, Text, ScrollView, RefreshControl } from 'react-native';
import { BackgroundView } from '../../../components/Global/index';
import styles from './styles';
import { DrawerButton, ProfileCard } from '../../../components/Profile';
import { BackButton } from '../../../components/Friends';

const FriendsProfileScreen = (props) => {
    return(
        <BackgroundView style={styles.root}>
            <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false} />}>
                    <BackButton />
                    <ProfileCard />
                </ScrollView>
            </View>
        </BackgroundView>
    );
}

export default FriendsProfileScreen;
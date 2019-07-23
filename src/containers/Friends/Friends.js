import React from 'react';
import { View, SafeAreaView, Text, ScrollView, RefreshControl } from 'react-native';

import { BackgroundView } from '../../components/Global/index';
import { DrawerButton } from '../../components/Profile/index';
import { FriendsCard } from '../../components/Friends/index';
import styles from './styles';

const Friends = (props) => {
    return(
        <BackgroundView style={styles.root}>
            <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={false} />}>
                    <DrawerButton />   
                    <Text style={styles.headerText}>Friends</Text>
                    <FriendsCard />
                </ScrollView>
            </View>
        </BackgroundView>
    );
}

export default Friends;
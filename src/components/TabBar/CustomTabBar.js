import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TabBarBottomProps, NavigationRoute } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { withNavigation } from 'react-navigation';

import styles from './styles';

import YourBarsTabButton from './YourBarsTabButton/YourBarsTabButton';
import PlansTabButton from './PlansTabButton/PlansTabButton';
import ActivitiesTabButton from './ActivitiesTabButton/ActivitiesTabButton';
import MessagesTabButton from './MessagesTabButton/MessagesTabButton';

class CustomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.root}>
        <LinearGradient
          colors={["rgba(66,19,123,1)", "transparent"]}
          style={styles.rootContainer}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <YourBarsTabButton />
          <PlansTabButton />
          {/* <ActivitiesTabButton /> */}
          <MessagesTabButton />
          
        </LinearGradient>
      </View>
    );
  }
}

export default withNavigation(CustomTabBar);

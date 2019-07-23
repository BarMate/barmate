import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class LatestInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        body: 'jfkiodjsofjdksjfoekwjkofjdsjfkesjldjfskljfkldjklafjlasdfjsdl;ajfasdojfowefhjaofhjdskl;afhjekohjwaopfhjdskajfkldjasfda'
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.barName}>Manny's Pub</Text>
        <Text style={styles.newsType}>Event - St. Patty's Day</Text>
        <Text style={styles.newsBody}>{this.state.body}</Text>
      </View>
    );
  }
}

export default LatestInfo;

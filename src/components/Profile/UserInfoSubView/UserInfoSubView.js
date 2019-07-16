import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

class UserInfoSubView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        profileStub: {
            age: [23, 2, 1998],
            bars: [{test: "Chidlfsdfsfsdfsd"}],
            bio: "BarMate CTO",
            friends: [{"dfewsfsd": "903j2fjdslfjds"}],
            gender: "Male",
            handle: "joeGainz",
            interest: "Female",
            karma: 6342,
            name: "Joe Contumelio",
            photoURL: "https://firebasestorage.googleapis.com/v0/b/barmate-e95b6.appspot.com/o/users%2FdaTEWcFLY5OSYHCcFbFdKKxpf0D3%2Fprofile-picture?alt=media&token=80c8b9ca-5ee8-4ee9-a4e5-75d17329e3c7",
          },
    };
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.basicInfoContainer}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source={{uri: this.state.profileStub.photoURL}}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{this.state.profileStub.name}</Text>
                <Text style={styles.handle}>@{this.state.profileStub.handle}</Text>
                <Text style={styles.age}>21 years old</Text>
                <View style={styles.locationContainer}>
                    <Ionicons name={'ios-navigate'} size={styles.locationIconSize} color={'#000000'} />
                    <Text style={styles.location}>Steubenville, OH</Text>
                </View>
            </View>
        </View>
        <View style={styles.barScoreContainer}>
            <Text style={styles.karma}>6,432</Text>
        </View>
        <View style={styles.bioContainer}>
            <Text style={styles.bio}>"I guess I should go to school, even though there's no kid friendly videos there."</Text>
        </View>
      </View>
    );
  }
}

export default UserInfoSubView;

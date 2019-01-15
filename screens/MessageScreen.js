import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { navigation } from 'react-navigation';

import firebase from '../config/Firebase.js';

// Currently trying to follow this guide: https://snack.expo.io/@bacon/firebase-basic-chat
// Put the Fire class into this one instead to try and limit routing data all over the place

class Fire {

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    getRef(recipientId, id) {
        return firebase.database().ref('/users/' + recipientId + '/messages/' + id);
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    on = callback =>
        this.getRef(this.props.navigation.state.params.id, firebase.auth().currentUser.uid)
        .limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)));

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // send the message to the Backend
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        const message = {
            text,
            user,
            timestamp: this.timestamp,
        };
        this.append(message);
        }
    };

    append = message => this.getRef(this.props.id, firebase.auth().currentUser.uid).push(message);

    // close the connection to the Backend
    off() {
        this.ref.off();
    }
}

Fire.shared = new Fire();

class MessageScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
    recipientId: this.props.id,
    recipientName: this.props.name
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default MessageScreen;
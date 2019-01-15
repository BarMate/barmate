import React from 'react';
import { connect } from 'react-redux';
import { View, Spinner } from 'react-native';

import MessageList from './MessageList';
import { updateMessagesHeight } from '../../redux/actions/MessagesActions.js';

const mapStateToProps = (state) => ({
    messages: state.chatroom.messages,
    isFetching: this.props.chatroom.meta.isFetching
});

const Messages = connect(
    mapStateToProps
)(({ messages, isFetching, dispatch }) => {
    if (isFetching) {
        return (
            <View style={{paddingTop: 50,
                          paddingBottom: 50}}>
                <Spinner />
            </View>
        )
    }else{
        return <MessageList messages={messages}
                            style={{minHeight: 100}}
                            onLayout={(event) => dispatch(updateMessagesHeight(event))} />
    }
});

export default Messages;
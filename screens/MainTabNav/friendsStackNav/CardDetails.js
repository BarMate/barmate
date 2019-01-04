import React, { Component } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { connect } from 'react-redux';

class CardDetails extends Component {
  render() {
    return (
      <SafeAreaView>
        <Text>{this.props.creatorObject.creator}</Text>
        <Text>{this.props.creatorObject.eventName}</Text>
        <Text>{this.props.creatorObject.description}</Text>
      </SafeAreaView>
    )
  }
}
 
// Extract data from store
const mapStateToProps = state => ({ 
  creatorObject: state.plansReducer.cardObject
})

export default connect(mapStateToProps, null)(CardDetails)

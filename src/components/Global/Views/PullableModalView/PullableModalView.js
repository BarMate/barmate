/* 
    PullableModalView.js
    
    Modal that can be pulled down using gestures
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ScrollView
} from "react-native";

import styles from './styles';
import Modal from 'react-native-modal';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/**
 * 
 * props: visible: bool - should modal be visible
 *        isScrollable: bool - should be true if modal has scrollable content
 */

class PullableModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: this.props.visible,
      scrollOffset: 0,
    };
  }


  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  _determineRenderType() {
    if(this.props.isScrollable == true) {
      return (
        <ScrollView
          ref={ref => (this.scrollViewRef = ref)}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={16}
        >
          {this.props.children}
        </ScrollView>
      )
    }
    else {
      return (this.props.children)
    }
  }

  _handleSwipeDirection() {
    if(this.props.shouldSwipe == true) {
      return 'down'
    }
    else {
      return ''
    }
  }

  render() {
    return (
      <Modal
        hideModalContentWhileAnimating
        isVisible={this.state.visibleModal}
        onSwipeComplete={() => this.setState({ visibleModal: false })}
        onBackdropPress={() => this.setState({ visibleModal: false })}
        style={{margin: 0}}
        propagateSwipe
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={400 - 300} // content height - ScrollView height
      >
        <View style={styles.root}>
          {/* Pulldown bar Container */}
          <SafeAreaView onTouchEnd={() => this.setState({visibleModal: false})} style={styles.pulldownBarContainer}>
            <View style={styles.pulldownBar} />
          </SafeAreaView>

          {/* Content Container */}
          <View style={[styles.contentContainer, this.props.style]}>
            {this._determineRenderType()}
          </View>
        </View>
      </Modal>
    );
  }
}

export default PullableModalView;

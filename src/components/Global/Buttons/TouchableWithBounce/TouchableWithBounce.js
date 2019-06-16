import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

class TouchableWithBounce extends Component {
  constructor(props) {
    super(props);
    this.state = {
        scale: new Animated.Value(1.0),
    };
  }

  _onPressIn() {
    let { scale } = this.state;

    Animated.timing(                  
        scale,           
        {
          toValue: 1.1,                   
          duration: 100,
        }
    ).start(); 
  }

  _onPressOut() {
    let { scale } = this.state;

    Animated.spring(
        scale,
        {
          toValue: 1.0,
          bounciness: 20,
        }
    ).start(); 
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={this.props.onPress} onPressIn={() => this._onPressIn()} onPressOut={() => this._onPressOut()}>
            <Animated.View style={[this.props.style, { transform: [ { scale: this.state.scale } ] } ]}>
                {this.props.children}                
            </Animated.View>
        </TouchableWithoutFeedback>
    );
  }
}

export default TouchableWithBounce;

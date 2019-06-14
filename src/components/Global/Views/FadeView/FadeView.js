import React, { Component } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';

/**
 * Fades all children in view
 * Supports normal fade in, fade out,
 * fade in up down left right,
 * fade out up down left right.
 * 
 * props: fadeInType : String 'fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight'
 *        fadeOutType : String 'fadeOut, fadeOutUp, fadeOutDown, fadeOutLeft, fadeOutRight'
 *        fadeInTime : Float 'Time it takes for the fade in animation to take'
 *        fadeOutTime : Float 'Time it takes for the fade out animation to take'
 */

class FadeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0.0),
        };
    }

    componentDidMount() {
        this._determineFadeInType();
    }

    componentWillUnmount() {
        this._determineFadeOutType();
    }

    _determineFadeInType() {
        switch(this.props.fadeInType) {
            case 'fadeIn' : { this._fadeIn() };
            case 'fadeInUp' : { this._fadeInUp() };
            case 'fadeInDown' : { this._fadeInDown() };
            case 'fadeInLeft' : { this.fadeInLeft() };
            case 'fadeInRight' : { this._fadeInRight() };

            default: { this._fadeIn() };
        }
    }

    _determineFadeOutType() {
        switch(this.props.fadeOutType) {
            case 'fadeOut' : { this._fadeOut() };
            case 'fadeOutUp' : { this._fadeOutUp() };
            case 'fadeOutDown' : { this._fadeOutDown() };
            case 'fadeOutLeft' : { this.fadeOutLeft() };
            case 'fadeOutRight' : { this._fadeOutRight() };

            default: { this._fadeOut() };
        }
    }
    
    _fadeIn() {
        Animated.timing(this.state.opacity, {
            toValue: 1.0,                   
            duration: this.props.fadeInTime !== undefined ? this.props.fadeInTime : 500,
        }).start();
    }

    _fadeInUp() {}
    _fadeInDown() {}
    _fadeInLeft() {}
    _fadeInRight() {}
    
    _fadeOut() {
        Animated.spring(this.state.opacity, {
            toValue: 0.0,                   
            duration: this.props.fadeOutTime ? this.props.fadeOutTime : 1000,
        }).start();
    }

    _fadeOutUp() {}
    _fadeOutDown() {}
    _fadeOutLeft() {}
    _fadeOutRight() {}

    render() {
        return (
            <Animated.View style={[this.props.style, { opacity: this.state.opacity }]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

export default FadeView;

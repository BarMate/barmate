import React, { Component } from 'react'
import { View, Image } from 'react-native'
import firebase from '../config/Firebase.js';

export default class AsyncImage extends Component {
  
    constructor(props) {
        super(props)
        this.state = { 
            loaded: false, 
            image: null,
            isActualPicture: null
        }
    }

    componentDidMount(){
        this.loadImage();
    }
    
    loadImage(){
        let imageRef = firebase.storage().ref(`users/${this.props.uid}/profile-picture`)
        imageRef.getDownloadURL().then(url => {
            console.log('successfully retrieved image for ' + this.props.uid + '\n' + url);
            this.setState({
                image: url,
                loaded: true,
                isActualPicture: true
            })
        })
        .catch(error => {
            switch (error.code) {
                case 'storage/object-not-found':
                    console.log('Image doesnt exist for ' + this.props.uid)
                    this.setState({
                        image: require('../assets/login/defaultProfilePicture.png'),
                        loaded: true,
                        isActualPicture: false
                    })
                    break;
                default: 
                    console.log('there was an error retrieving the image for ' + this.props.uid);
                    this.setState({
                        loaded: false,
                        isActualPicture: false
                    })
                }
        })
    }

    render() {
        if(!this.state.loaded){
            return(
                <View
                    style={this.props.style}
                />
            );
        }
        if(this.state.loaded && !this.state.isActualPicture){
            return(
                <View style={this.props.style}>
                    <Image
                        source={this.state.image}
                        resizeMode={'contain'}
                        style={[
                            this.props.style,
                            {
                            position: 'absolute',
                            resizeMode: 'contain'
                            }
                        ]}
                    />
                </View>
            );
        }
        return (
            <View style={this.props.style}>
                <Image
                    source={{uri: this.state.image}}
                    resizeMode={'contain'}
                    style={[
                        this.props.style,
                        {
                          position: 'absolute',
                          resizeMode: 'contain'
                        }
                    ]}
                />
            </View>
        );
    }
}
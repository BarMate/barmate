//=============================================================
// Map.js
//
// Used to display map on the Search screen
//
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================

//=============================================================
// Imports
//=============================================================
import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//=============================================================


//=============================================================
// Used for map functions
//=============================================================
import MapView, { Marker, Callout } from 'react-native-maps';
import { LocationItem } from './LocationItem.js';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
//=============================================================

//=============================================================
// Barmate theme
//=============================================================
import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';
//=============================================================

//=============================================================
// Firebase
//=============================================================
import firebase from '../config/Firebase.js';
//=============================================================

//=============================================================
// Native base stylings
//=============================================================
import { Input, Item, Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text, H1, H2, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
//=============================================================

//=============================================================
// Variables and Constants
//=============================================================
import Variables  from '../config/Variables.js';
import COLORS from '../config/Colors.js'; 
//=============================================================

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            
            barMarkers: [],
            clubMarkers: [],
            modalVisible: false,

            loading: true,
            
            // Used for displaying marker details
            selectedName: '',
            selectedOpen: null,
            selectedRating: '',
            selectedPrice: null,
            selectedDescription: '',

            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: null,
                longitudeDelta: null,
            }
        };
    }

    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => (
            focused ? <Ionicons name={'ios-search'} size={25} color={'#FFFFFF'} />
                : <Ionicons name={'ios-search'} size={25} color={'#536497'}/>
        ),
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'white',
            inactiveTintColor: '#536497',
            style: {
                backgroundColor: '#030e2c',
            }
        },
        animationEnabled: false,
        swipeEnabled: false,
    };

    componentDidMount(){
        this.fetchMarkerData();
    };
    
    printBarJson(){
        console.log(this.state.markers[0]);
    };

    fetchMarkerData(){
        navigator.geolocation.getCurrentPosition((position) => {
            const barUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + position.coords.latitude + ',' + position.coords.longitude + '&radius=5000&types=bar&key=' + API_KEY;
            const clubUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + position.coords.latitude + ',' + position.coords.longitude + '&radius=5000&types=night_club&key=' + API_KEY;
            var arrayMarks = [];
            //information for clubs
            fetch(clubUrl)
            .then((data) => data.json())
            .then((res) => {
                for(var i=0; i < res.results.length; i++){
                    var instance = res.results[i];
                    //may have to change description
                    
                    arrayMarks.push({
                        name: instance.name,
                        coordinate: {latitude: instance.geometry.location.lat, longitude: instance.geometry.location.lng},
                        description: "club " + i,
                        price: "price_level" in instance  ? instance.price_level : 0,
                        open: "opening_hours" in instance ? (instance.opening_hours.open_now ? 'Open' : 'Closed') : 'N/A',
                        rating: "rating" in instance ? instance.rating : 0,
                        key: "place_id" in instance ? instance.place_id : null,
                        photos: instance.photos,
                    });   
                }
                this.setState({
                    clubMarkers: arrayMarks,
                 })
                 //causes warning to debugger but prevents android timer error
               .catch((error) => {
                 console.error(error);
               }); 
               
            });
            fetch(barUrl)
            .then((data) => data.json())
            .then((res) => {
                arrayMarks=[];
                for(var i=0; i < res.results.length; i++){
                    var instance = res.results[i];
                    
                    //will not add a bar marker if it's already added as a club
                    if(arrayMarks.indexOf(instance.place_id) <= -1){
                        arrayMarks.push({
                            name: instance.name,
                            coordinate: {latitude: instance.geometry.location.lat, longitude: instance.geometry.location.lng},
                            description: "bar " + i,
                            price: "price_level" in instance  ? instance.price_level : 0,
                            open: "opening_hours" in instance ? (instance.opening_hours.open_now ? 'Open' : 'Closed') : 'N/A',
                            rating: "rating" in instance ? instance.rating : 0,
                            key: "place_id" in instance ? instance.place_id : null,
                            photos: "photos" in instance ? instance.photos : null,
                        }); 
                    }  
                }
                this.setState({
                    ...this.state,
                    barMarkers: arrayMarks,
                    loading: false,
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    },
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                 })
                 //causes warning to debugger but prevents android timer error
               .catch((error) => {
                 console.error(error);
               }); 
            });
        },
      (error) => this.setState({ ...this.state, error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    setNumber(num) {
        this.setState({testNumber: num});
    };

    setBarID(id) {
        this.setState({barID: id});
    };

    _handleMapRegionChange = region => {
        this.setState({ region });
    };


    //Adds bar to database, while checking to make sure it does not create duplicates
    addBarToDatabase(name, rating) {
        this.setBarID(null);        //<=== Playing it safe, sometimes it doesn't reset (see below)
        this.checkBarExist(name, this.state.markerLat, this.state.markerLong);

        //This is for tracking errors. A lot of times, if you choose a new bar to add, for some reason it will keep the ID of the previous bar for the first try only
        console.log('barID before checking: ' + this.state.barID);

        if(this.state.barID === null){  //<=== is the ID anything other than a number? Then it already exists or something happened (see above)
            this.getBarNum();   //<=== Retrieve total number of bars from database
            if(this.state.testNumber !== null){         //If successful, proceed
                firebase.database().ref('bars/' + this.state.testNumber).set({      //Information for bar to add
                    ID: this.state.testNumber,
                    Name: name,
                    Rating: rating,
                    Latitude: this.state.markerLat,
                    Longitude: this.state.markerLong,
                    totalPosts: 0
                });
                this.setBarNum(this.state.testNumber + 1);      //Update totalBars value in database, increasing it by 1
            }else{
                alert('Something went wrong! Please try again');        //Typical error message
                console.log(this.state.testNumber + ' == null (?)');    //<=== Usually the case every single time. Happens on the first try
            } 
        }else{
            alert('This bar already exists! (Might be an error, try once more!)');  //<=== Already exists, or barID retained an old value (for some reason)
        }
    }
    
    //Checks to see if the bar exists already in the database
    checkBarExist(name, lat, long) {
        this.setBarID(null);
        var query = firebase.database().ref('bars').orderByChild('Latitude').equalTo(lat);      //<=== Order by latitude, less results that way and therefore faster
        query.once("value", snapshot => {
            snapshot.forEach(child => {         //<=== Cycle through each result
                if(child.val().Name === name && child.val().Latitude === lat && child.val().Longitude === long){    //<=== Does name, lat, and long match up?
                    this.setBarID(child.key);       //If it does, set that as the BarID
                    console.log('Bar found, location: ' + child.key);       // Error/quality assurance
                }
            });
        });      
    }

    //Retrieves total number of bars in database, sets value to testNumber
    getBarNum(){
        var query = firebase.database().ref('stats').orderByKey().equalTo('barsAdded');
        query.on("value", snapshot => {
            this.setNumber(snapshot.val().barsAdded);
        });
    }

    //Updates/sets total number of bars in database
    setBarNum(num){
        var query = firebase.database().ref('stats');
        query.update({
            barsAdded: num
        })
    }

    //Add feed to bar
    addToFeed(name, author, msg){
        firebase.database().ref('bars/' + name + '/messages').update(
            {
                Author: author,
                Content: msg,
            }
        );
    }

    //Add user to database
    addUserToDatabase(name) {
        firebase.database().ref('users/' + name).update(
            {
                Name: name,
                Bio: "Absolutely flawless"
            }
        );
    }

    handleRoute() {
        this.addBarToDatabase(this.state.name, this.state.rating);
    }
    
    //Apologies for messy and useless code
    //MY 2nd attempt at searching, using the same method as searching for bars, since you are able to search for types
    searchResults(searchTxt){
        const searchUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + searchTxt + '&type=bar,night_club&inputtype=textquery&fields=name,rating,opening_hours,formatted_address&locationbias=circle:5000@' + this.state.lat + ',' + this.state.long + '&key=' + API_KEY;
    
        fetch(searchUrl)
            .then((data) => data.json())
            .then((res) => {
                const results = [];
            
                res.results.map((element, i) => {
                    results.push(
                        <LocationItem
                            key={element.name}
                            value={element.description}/>
                    )
                })
            })
    }
    
    render() {
        return(
            <MapView
            style={styles.map}
            initialRegion={this.state.region}
            onRegionChange={() => this._handleMapRegionChange.bind(this)}>
            {this.state.barMarkers.map(marker => (
                    <Marker
                        key={marker.key}
                        coordinate={{latitude: marker.coordinate.latitude, longitude: marker.coordinate.longitude}}
                        title={marker.name}
                        description={marker.description}
                        onPress={() => {this.setState({selectedName: marker.name, selectedCoordinate: marker.coordinate, selectedRating: marker.rating, selectedOpen: marker.open, selectedPrice: marker.price, selectedDescription: marker.description});this.setModalVisible(true);}}>
                        <View>
                            <Icon name='md-pin' style={{color: '#030e2c', fontSize: 40,}}/>
                        </View>
                    </Marker>
                    
            ))}
            {this.state.clubMarkers.map(marker => (
                    <Marker
                        key={marker.key}
                        coordinate={{latitude: marker.coordinate.latitude, longitude: marker.coordinate.longitude}}
                        title={marker.name}
                        description={marker.description}
                        onPress={() => {this.setState({selectedName: marker.name, selectedCoordinate: marker.coordinate, selectedRating: marker.rating, selectedOpen: marker.open, selectedPrice: marker.price, selectedDescription: marker.description});this.setModalVisible(true);}}>
                        <View>
                            <Icon name='md-pin' style={{color: '#1c2e63', fontSize: 40,}}/>
                        </View>
                    </Marker>
                    
            ))}
        </MapView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultsWrapper: {
        top: 220,
        position: "absolute",
        width: Dimensions.get("window").width,
        height: 1000,
        backgroundColor: "#FFFFFF",
        opacity: 0.9
    },
    primaryText: {
        fontWeight: "bold",
        color: "#373737"
    },
    secondaryText: {
        fontStyle: "italic",
        color: "#7D7D7D"
    },
    leftContainer: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor: "#7D7D7D"
    },
    leftIcon: {
        fontSize: 20,
        color: "#7D7D7D"
    },
    distance:{
        fontSize: 12
    }
});

export default Map;
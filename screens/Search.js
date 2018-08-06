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
} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons';

import MapView, { Marker, Callout } from 'react-native-maps';

import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';

import { Input, Item, Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text, H1, H2, Button } from 'native-base';

// Used to help layout objects on the screen for compatibility between devices
// Google react native easy grid for more info
import { Col, Row, Grid } from 'react-native-easy-grid';
//============================================================================

/*
    For some reason, markers are not showing up on my android emulator, not sure if it is just the emulator or the code
    So, for now, on android markers aren't showing up but on iphone they are.
*/

var { height, width } = Dimensions.get('window');

class SearchScreen extends React.Component {
    
    constructor() {
        super();
        this.state = {
            lat: null,
            long: null,
            places: null,
            clubs: null,
            markers: [],
            modalVisible: false,

            // Used for displaying marker details
            name: '',
            open: null,
            rating: '',
            price: null,
        }
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

    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            this.setState({lat, long});
            this.getPlaces();
        })
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    setOpeningHours(open) {
        this.setState({open: open});
    };

    setRating(rating) {
        this.setState({rating: rating});
    };

    setPriceLevel(price) {
       this.setState({price: price});
    };

    setName(name) {
        this.setState({name: name});
    };

    getPlaces() {
    //Separate urls for both bar and club searches (since they don't contain the same sub-data). 
    //You can use either this.state.lat/long for the current location, or the coordinates I have set for the bars/clubs in tallahassee
    const barUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + '30.436211' + ',' + '-84.310171' + '&radius=5000&types=bar&key=AIzaSyCskpsQ0KdNBrxUaxDcp57PndW6xMRHOWY';
    const clubUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + '30.436211' + ',' + '-84.310171' + '&radius=5000&types=night_club&key=AIzaSyCskpsQ0KdNBrxUaxDcp57PndW6xMRHOWY';

    //information for bars
    fetch(barUrl)
      .then((data) => data.json())
      .then((res) => {
        const arrayMarks = [];

        res.results.map((element, i) => {
          arrayMarks.push(
            <Marker
              key={i}
              coordinate={{
                latitude: element.geometry.location.lat,
                longitude: element.geometry.location.lng
              }}
            //   title={element.name}
              description={element.description}
              onPress={() => { this.setRating(element.rating),
                                this.setPriceLevel(element.price_level),
                                this.setName(element.name),
                                this.setOpeningHours(element.opening_hours.open_now ? 'Open' : 'Closed'),
                                this.setModalVisible(true) }}>
              <View>
                <Icon name='ios-pin' style={{color: '#030e2c', fontSize: 40,}}/>
              </View>
            </Marker>
          )
        })
        this.setState({places: arrayMarks});
      }),

      // info for clubs
      fetch(clubUrl)
      .then((data) => data.json())
      .then((res) => {
        const newMarks = [];

        res.results.map((element, i) => {
          newMarks.push(
            <Marker
              key={i}
              coordinate={{
                latitude: element.geometry.location.lat,
                longitude: element.geometry.location.lng
              }}
              description={element.description}
              onPress={() => { this.setRating(element.rating),
                this.setPriceLevel(element.price_level),
                this.setName(element.name),
                this.setOpeningHours('Unknown'),
                this.setModalVisible(true) }}>
            <View>
                <Icon name='md-pin' style={{color: '#1c2e63', fontSize: 40,}}/>
            </View>
            </Marker>
          )
        })
        this.setState({clubs: newMarks});

      })
      //Quick note: some locations are listed as both bars AND nightclubs (i.e. Bullwinkle's in Tallahassee) and will show up twice in the same spot in the app
}


    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    render() {
        return (
            <StyleProvider style={getTheme(Common)}>
                <Container>

                    <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" style={{color: '#FFFFFF'}}/>
                        <Input placeholder="Search" />
                        <Icon name="ios-wine" style={{color: '#FFFFFF'}}/>
                    </Item>
                    </Header>

                    <Content scrollEnabled={false}>
                        <View style={{width: width, height: height}}>

                            {/* TODO: Put modal in different file to reduce clutter */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                backdropOpacity= {0.5}>
                                <Grid>
                                    <Row style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={3} onPress={() => {this.setModalVisible(false)}}></Row>
                                    <Row style={{ backgroundColor: '#1c2e63'}} size={1}>
                                    <Grid>
                                        <Row style={{ backgroundColor: '#030e2c'}} size={20}>
                                            <Left>
                                                <Text numberOfLines={1} style={{paddingLeft: 5, fontSize: 20}}>{this.state.name}</Text>
                                            </Left>
                                            <Right>
                                                <Text style={{paddingRight: 5, fontSize: 20}}>{this.state.rating}</Text>
                                            </Right>
                                        </Row>
                                        <Row style={{ backgroundColor: '#19233F'}} size={80}>
                                            <Col style={{ backgroundColor: '#19233F'}} size={60}>
                                                <Text style={{paddingLeft: 5, marginTop: 10, fontSize: 15, backgroundColor: '#030e2c'}}>{this.state.open}</Text>
                                            </Col>
                                            <Col style={{ backgroundColor: '#19233F'}} size={40}>
                                                <Body>
                                                    <Button style={{marginTop: 80}}success>
                                                        <Text style={{color: '#FFFFFF', fontStyle: 'bold'}}>    Add    </Text>
                                                    </Button>
                                                </Body>                                               
                                            </Col>
                                        </Row>
                                    </Grid>
                                    </Row>
                                </Grid>
                            </Modal>

                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: 30.436211,
                                    longitude: -84.310171,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                                onRegionChange={this._handleMapRegionChange}
                            >
                                {this.state.places}
                                {this.state.clubs}
                            </MapView>
                        </View>
                    </Content>    

                 </Container>
            </StyleProvider>
        );
    }


    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
});

export default SearchScreen;
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  StyleProvider,
} from "native-base";

import getTheme from "../../native-base-theme/components/index.js";
import Common from "../../native-base-theme/variables/commonColor.js";
import { LinearGradient } from "expo";
import Variables from "../../config/Variables.js";
import COLORS from "../../config/Colors.js";
import { Ionicons } from '@expo/vector-icons'; 
import { DrawerActions, withNavigation } from 'react-navigation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <View style={{marginLeft: 10}}>
                    <TouchableOpacity onPressOut={() => {navigation.dispatch(DrawerActions.toggleDrawer())}}>
                      <Ionicons name={"ios-menu"} size={25} color={"#FFFFFF"}/>
                    </TouchableOpacity>
                  </View>,
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(Common)}>
      <Container>
        <StatusBar barStyle="light-content"/>
        {/* <Header>
          <Left style={{flex: 1}}>
            <TouchableOpacity onPress={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}}>
                <Ionicons name={'ios-menu'} size={30} color={'#FFFFFF'} style={{paddingLeft: 10}} />
            </TouchableOpacity>
          </Left>
          <Body style={{flex: 3, justifyContent: 'center',}}>
            <Title style={{alignSelf: 'center'}}>Manny's Bar</Title>
          </Body>
          <Right style={{flex: 1}}>
            
          </Right>
        </Header> */}
        <Content scrollEnabled={false}>
          <LinearGradient
            style={styles.gradient}
            colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>Happening Tonight</Text>
              <Text style={styles.info}>54 people planning on coming{'\n'}to the bar.</Text>
              <Text style={styles.info}>20 people currently here</Text>
              <Text style={styles.info}>32 people chatting</Text>
              <Text style={styles.info}>200 people meeting each other</Text>

              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Meet')}}>
                <View style={styles.boxContainer}>
                    <Text style={styles.boxText}>Meet</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Discuss')}}>
                <View style={styles.boxContainer}>
                    <Text style={styles.boxText}>Discuss</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Menu')}}>
                <View style={styles.boxContainer}>
                    <Text style={styles.boxText}>Menu</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Events')}}>
                <View style={styles.boxContainer}>
                    <Text style={styles.boxText}>Events</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Chat')}}>
                <View style={styles.boxContainerBottom}>
                    <Text style={styles.boxText}>Chat</Text>
                </View>
              </TouchableOpacity>

            </ScrollView>
          </LinearGradient>
        </Content>
      </Container>
    </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
      width: Variables.deviceWidth,
      height: Variables.deviceHeight,
      alignItems: 'center',
    },
  title: {
    marginTop: 50,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'HkGrotesk_Bold',
    fontSize: 30,
  },
  info: {
    marginBottom: 10,
    color: 'white',
    fontFamily: 'HkGrotesk_Regular',
    fontSize: 20,
  },
  boxContainer: {
    justifyContent: 'flex-end',
    marginTop: 40,
    width: Variables.deviceWidth - 70,
    height: 150,
    backgroundColor: '#100D64',
    borderRadius: 20,
  },
  boxContainerBottom: {                 // used because scrollview cuts off the bottom container
    justifyContent: 'flex-end',
    marginTop: 40,
    marginBottom: 120,
    width: Variables.deviceWidth - 70,
    height: 150,
    backgroundColor: '#100D64',
    borderRadius: 20,
  },
  boxText: {
    marginLeft: 15,
    marginBottom: 5,
    color: 'white',
    fontFamily: 'HkGrotesk_Bold',
    fontSize: 30,
  }
});

export default withNavigation(HomeScreen);

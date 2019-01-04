import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { setModalVisible } from '../redux/actions';

import Variables from '../config/Variables';
import COLORS from '../config/Colors';
import ChooseSignUpMethod from './SignUpStackNav/ChooseSignUpMethod';

class Start extends Component {
  myCustomAnimatedValue = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  getPageTransformStyle = index => ({
    transform: [
      {
        scale: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (Variables.deviceWidth + 8), // Add 8 for dividerWidth
            index * (Variables.deviceWidth + 8),
            (index + 1) * (Variables.deviceWidth + 8),
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        rotate: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (Variables.deviceWidth + 8),
            index * (Variables.deviceWidth + 8),
            (index + 1) * (Variables.deviceWidth + 8),
          ],
          outputRange: ['180deg', '0deg', '-180deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            console.log('Modal closed');
          }}
        >
          <ChooseSignUpMethod />
        </Modal>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity
          style={styles.signupButtonContainer}
          onPress={() => {
            this.props.setModalVisible(true);
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'HkGrotesk_Bold',
              fontSize: 20,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <View style={styles.footerText}>
          <Text style={styles.signIn1}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SignIn');
            }}
          >
            <Text style={styles.signIn2}> Sign In.</Text>
          </TouchableOpacity>
        </View>

        <ParallaxSwiper
          speed={0.5}
          animatedValue={this.myCustomAnimatedValue}
          dividerWidth={0}
          dividerColor={COLORS.TRANSPARENT_COLOR}
          backgroundColor="#302C9E"
          // onMomentumScrollEnd={activePageIndex => ()}
          showProgressBar
          progressBarBackgroundColor="rgba(0,0,0,0.25)"
          progressBarValueBackgroundColor="#302C9E"
        >
          <ParallaxSwiperPage
            BackgroundComponent={(
              <LinearGradient
                style={styles.gradient}
                colors={[COLORS.GRADIENT_COLOR_SIGNUP_1, COLORS.GRADIENT_COLOR_SIGNUP_2]}
              >
                <View opacity={0.5}>
                  <Image
                    style={styles.backgroundImage}
                    source={require('../assets/signup/background1.jpg')}
                  />
                </View>
              </LinearGradient>
)}
            ForegroundComponent={(
              <View style={styles.foregroundTextContainer}>
                <Image style={styles.image} source={require('../assets/global/logo_final.png')} />
                <Text style={styles.title}>BarMate</Text>
                <Text style={styles.subtitle}>Your guide to going out.</Text>
              </View>
)}
          />

          <ParallaxSwiperPage
            BackgroundComponent={(
              <LinearGradient
                style={styles.gradient}
                colors={[COLORS.GRADIENT_COLOR_SIGNUP_1, COLORS.GRADIENT_COLOR_SIGNUP_2]}
              >
                <View opacity={0.5}>
                  <Image
                    opacity={0.5}
                    style={styles.backgroundImage}
                    source={require('../assets/signup/background2.jpg')}
                  />
                </View>
              </LinearGradient>
)}
            ForegroundComponent={(
              <View style={styles.foregroundTextContainer}>
                <Image
                  style={styles.glyph}
                  source={require('../assets/signup/signup_glyph_1.png')}
                />
                <Text style={styles.title}>Meet</Text>
                <Text style={styles.subtitle}>Find people at your</Text>
                <Text style={styles.subtitle}> local spots and chat.</Text>
              </View>
)}
          />
          <ParallaxSwiperPage
            BackgroundComponent={(
              <LinearGradient
                style={styles.gradient}
                colors={[COLORS.GRADIENT_COLOR_SIGNUP_1, COLORS.GRADIENT_COLOR_SIGNUP_2]}
              >
                <View opacity={0.5}>
                  <Image
                    style={styles.backgroundImage}
                    source={require('../assets/signup/background3.jpg')}
                  />
                </View>
              </LinearGradient>
)}
            ForegroundComponent={(
              <View style={styles.foregroundTextContainer}>
                <Image
                  style={styles.glyph}
                  source={require('../assets/signup/signup_glyph_2.png')}
                />
                <Text style={styles.title}>Plan your night</Text>
                <Text style={styles.subtitle}>Always know what your </Text>
                <Text style={styles.subtitle}> friends are up to every night.</Text>
              </View>
)}
          />
          <ParallaxSwiperPage
            BackgroundComponent={(
              <LinearGradient
                style={styles.gradient}
                colors={[COLORS.GRADIENT_COLOR_SIGNUP_1, COLORS.GRADIENT_COLOR_SIGNUP_2]}
              >
                <View opacity={0.5}>
                  <Image
                    opacity={0.5}
                    style={styles.backgroundImage}
                    source={require('../assets/signup/background2.jpg')}
                  />
                </View>
              </LinearGradient>
)}
            ForegroundComponent={(
              <View style={styles.foregroundTextContainer}>
                <Image
                  style={styles.glyph}
                  source={require('../assets/signup/signup_glyph_3.png')}
                />
                <Text style={styles.title}>Stay in the loop</Text>
                <Text style={styles.subtitle}>From events to new drinks, </Text>
                <Text style={styles.subtitle}>always know what’s going on </Text>
                <Text style={styles.subtitle}>at your favorite spots.</Text>
              </View>
)}
          />
        </ParallaxSwiper>
      </View>
    );
  }
}

// Pull data from store
const mapStateToProps = state => ({
  modalVisible: state.signUpReducer.modalVisible,
});

const mapDispatchToProps = {
  setModalVisible,
};
const styles = StyleSheet.create({
  backgroundImage: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight,
  },
  foregroundTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.41,
    color: 'white',
  },
  gradient: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight,
  },
  image: {
    width: 140,
    height: 150,
    marginTop: 250,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 40,
    marginTop: 10,
    fontFamily: 'HkGrotesk_Bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'HkGrotesk_Medium',
  },
  signupButtonContainer: {
    width: 200,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#3999c9',
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  glyph: {
    width: 220,
    height: 220,
    marginTop: 200,
  },
  footerText: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    bottom: 0,
    marginBottom: 30,
  },
  signIn1: {
    color: '#bfbfbf',
    fontFamily: 'HkGrotesk_Light',
    fontSize: 12,
    marginBottom: 5,
  },
  signIn2: {
    color: 'white',
    fontFamily: 'HkGrotesk_Regular',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Start);
